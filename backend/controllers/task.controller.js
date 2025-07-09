import mongoose, { mongo } from "mongoose";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { logTaskUpdate } from "../utils/logTaskUpdates.js";
import { ActionLog } from "../models/actionLog.model.js";
import { io, usersocketMap } from "../socket/socket.js";

export const createTask = async (req, res) => {
  const { title, description, assignedUser, priority } = req.body;
  if (!title || !description || !assignedUser || !priority) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  let smartAssignedUser;
  try {
    //checking the task is already exist or not
    const existedTask = await Task.findOne({ title });

    if (existedTask) {
      return res.status(400).json({
        success: false,
        message: "Task with this title already exists ",
      });
    }

    //checking if assignedUser is smart or not
    if (assignedUser === "smart") {
      const leastBusyUser = await Task.aggregate([
        {
          $group: {
            _id: "$assignedUser",
            taskCount: { $sum: 1 },
          },
        },
        {
          $sort: { taskCount: 1 },
        },
        {
          $limit: 1,
        },
      ]);
      smartAssignedUser = leastBusyUser[0]?._id;
    }
    //manually checking for the user if it is not smart
    else {
      //checking the userid is a valid id or not
      if (!mongoose.Types.ObjectId.isValid(assignedUser)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID format",
        });
      }

      //checking the user is actually exist or not
      const userExisted = await User.findById(assignedUser);

      if (!userExisted) {
        return res.status(400).json({
          success: false,
          message: "Assigned User not found ",
        });
      }
    }
    //invalid titles
    const invalidTitles = ["todo", "in progress", "done"];

    //checking if the title is valid or not
    if (invalidTitles.includes(title.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Task title can not be 'Todo', 'In Progress' or 'Done' ",
      });
    }

    const finalAssignedUser =
      assignedUser === "smart" ? smartAssignedUser : assignedUser;

    // creating a new Task
    const newTask = await Task.create({
      title,
      description,
      assignedUser: finalAssignedUser,
      priority,
    });

    //creating an action log
    if (newTask) {
      const assignedToUser = await User.findById(finalAssignedUser);

      await ActionLog.create({
        user: req.user._id,
        task: newTask._id,
        action: "assign",
        description: `${req.user.name} assigned the task to ${assignedToUser.name}`,
      });

      //emitting and event that a new task is assigned
      const populatedTask = await Task.findById(newTask._id).populate(
        "assignedUser",
        "name"
      );
      Object.entries(usersocketMap).map(([userId, socketId]) => {
        if (userId !== req.user._id) {
          io.to(socketId).emit("taskCreated", populatedTask);
        }
      });
    }

    return res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      newTask,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedUser", "name");

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedUser, priority, status } = req.body;

  const updates = {};

  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (assignedUser !== undefined) updates.assignedUser = assignedUser;
  if (priority !== undefined) updates.priority = priority;
  if (status !== undefined) updates.status = status;

  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "One field is required for update" });
  }

  try {
    //checking the task id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID",
      });
    }

    const existedTask = await Task.findById(id);
    if (!existedTask) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }

    // checking for invalid titles
    const invalidTitles = ["todo", "in progress", "done"];
    if (updates.title && invalidTitles.includes(updates.title.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "task Title can not be 'Todo', 'In Progress' or 'Done",
      });
    }

    //checking for duplicate Title
    if (updates.title) {
      const duplicate = await Task.findOne({
        title: updates.title,
        _id: { $ne: id },
      });
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: "Another Task with this title already exists",
        });
      }
    }

    //checking assignedUserID is valid or not
    if (
      updates.assignedUser &&
      !mongoose.Types.ObjectId.isValid(updates.assignedUser)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid assigned User ID format",
      });
    }

    //checking assignedUser is actually a user or not
    if (updates.assignedUser) {
      const user = await User.findById(assignedUser);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Assigned User not found",
        });
      }
    }

    //updating the task
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (updatedTask && updatedTask.status !== existedTask.status) {
      const populatedTask = await Task.findById(updatedTask._id).populate(
        "assignedUser",
        "name"
      );
      Object.entries(usersocketMap).forEach(([userId, socketId]) => {
        if (userId !== String(req.user._id)) {
          io.to(socketId).emit("taskStatusUpdated", populatedTask);
        }
      });
    }

    //creating a action log
    await logTaskUpdate({
      userId: req.user._id,
      userName: req.user.name,
      task: existedTask,
      updates: updates,
    });

    return res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    //checking the id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Task ID Format is not valid ",
      });
    }

    //deleting the task
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(400).json({
        success: false,
        message: "Task ID not Found",
      });
    }

    //creating an action log
    const assignedToUser = await User.findById(assignedToUser);

    await ActionLog.create({
      user: req.user._id,
      task: id,
      action: "delete",
      description: `${req.user.name} delete the task which is assigned to ${assignedToUser.name}`,
    });

    return res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};
