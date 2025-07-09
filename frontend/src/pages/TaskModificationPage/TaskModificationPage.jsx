import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useUpdateTask from "../../hooks/useUpdateTask";

const TaskModificationPage = () => {
  const { id } = useParams();
  const otherUsers = useSelector((store) => store.auth.otherUsers);
  const tasks = useSelector((store) => store.task.tasks);
  const existingTaskData = tasks.find((task) => task._id === id);

  const [updatedTaskData, setUpdatedTaskData] = useState({
    title: existingTaskData?.title,
    description: existingTaskData.description,
    priority: existingTaskData.priority,
    assignedUser: existingTaskData.assignedUser._id,
  });

  const { updateTask, loading } = useUpdateTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(updatedTaskData, id);
  };
  return (
    <div className="assign-task-container">
      <h2 className="assign-task-container-heading">Update task</h2>
      <form className="assign-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            value={updatedTaskData.title}
            onChange={(e) =>
              setUpdatedTaskData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            required
            value={updatedTaskData.description}
            onChange={(e) =>
              setUpdatedTaskData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={updatedTaskData.priority}
            onChange={(e) =>
              setUpdatedTaskData({
                ...updatedTaskData,
                priority: Number(e.target.value),
              })
            }
          >
            <option value={3}>Low</option>
            <option value={2}>Medium</option>
            <option value={1}>High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assign To</label>
          <select
            name="assignedUser"
            value={updatedTaskData.assignedUser}
            required
            onChange={(e) =>
              setUpdatedTaskData({
                ...updatedTaskData,
                assignedUser: e.target.value,
              })
            }
          >
            {otherUsers.map((otherUser) => (
              <option key={otherUser._id} value={otherUser._id}>
                {otherUser.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="assign-task-submit-btn">
          {loading ? "Please wait" : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskModificationPage;
