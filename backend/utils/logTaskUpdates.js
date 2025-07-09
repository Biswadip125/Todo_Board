import { ActionLog } from "../models/actionLog.model.js";
import { User } from "../models/user.model.js";

export const logTaskUpdate = async ({
  userId,
  userName,
  task,
  updates = {},
}) => {
  const changes = [];
  const logs = [];

  //track each changes
  if (updates.title && updates.title !== task.title) {
    changes.push("title");
    logs.push({
      action: "update",
      description: `${userName} changed the title from ${task.title} to ${updates.title}`,
    });
  }

  if (updates.description && updates.description !== task.description) {
    changes.push("description");
    logs.push({
      action: "update",
      description: `${userName} changed the description from ${task.description} to ${updates.description}`,
    });
  }

  if (updates.status && updates.status !== task.status) {
    changes.push("status");
    logs.push({
      action: "change-status",
      description: `${userName} moved the task from "${task.status}" to "${updates.status}".`,
    });
  }

  if (
    updates.assignedUser &&
    updates.assignedUser.toString() !== task.assignedUser.toString()
  ) {
    const oldUser = await User.findById(task.assignedUser);
    const newUser = await User.findById(updates.assignedUser);
    changes.push("assignedUser");
    logs.push({
      action: "reassign",
      description: `${userName} reassigned the task from ${
        oldUser?.name || "Unknown"
      } to ${newUser?.name || "Unknown"}.`,
    });
  }

  if (updates.priority !== undefined && updates.priority !== task.priority) {
    changes.push("priority");
    logs.push({
      action: "change-priority",
      description: `${userName} changed the task priority from "${task.priority}" to "${updates.priority}".`,
    });
  }

  //Determine what to log
  if (changes.length === 1) {
    await ActionLog.create({
      user: userId,
      task: task._id,
      action: logs[0].action,
      description: logs[0].description,
    });
  } else if (changes.length > 1) {
    await ActionLog.create({
      user: userId,
      action: "update",
      description: `${userName} updated the task: ${changes.join(",")}`,
    });
  }
};
