import { useSelector } from "react-redux";
import "../../styleSheets/assigntaskpage.css";
import { useState } from "react";
import useAssignTask from "../../hooks/useAssignTask";
const AssignTask = () => {
  const otherUsers = useSelector((store) => store.auth.otherUsers);
  const { loading, assignTask } = useAssignTask();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: 3,
    assignedUser: otherUsers[0]?._id,
  });
  const [assignmentType, setAssignmentType] = useState("manual");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await assignTask(taskData);
  };
  const handleSmartAssign = (e) => {
    setTaskData({ ...taskData, assignedUser: e.target.value });
  };

  return (
    <div className="assign-task-container">
      <h2 className="assign-task-container-heading">Assign a New Task</h2>
      <form className="assign-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            value={taskData.title}
            onChange={(e) =>
              setTaskData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={taskData.description}
            required
            onChange={(e) =>
              setTaskData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            onChange={(e) => {
              setTaskData({ ...taskData, priority: Number(e.target.value) });
            }}
          >
            <option value={3}>Low</option>
            <option value={2}>Medium</option>
            <option value={1}>High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assignment Type</label>
          <div className="assignment-type-options">
            <label className="radio-option">
              <input
                type="radio"
                name="assignmentType"
                value="manual"
                checked={assignmentType === "manual"}
                onChange={() => {
                  setAssignmentType("manual");
                  setTaskData({
                    ...taskData,
                    assignedUser: otherUsers[0]?._id,
                  });
                }}
              />
              <span>Manual</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="assignmentType"
                value="smart"
                checked={assignmentType === "smart"}
                onChange={(e) => {
                  setAssignmentType("smart");
                  handleSmartAssign(e);
                }}
              />
              <span> Smart Assign</span>
            </label>
          </div>
        </div>

        {assignmentType === "manual" && (
          <div className="form-group">
            <label>Assign To</label>
            <select
              name="assignedUser"
              required
              onChange={(e) =>
                setTaskData({ ...taskData, assignedUser: e.target.value })
              }
            >
              {otherUsers.map((otherUser) => (
                <option key={otherUser._id} value={otherUser._id}>
                  {otherUser.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="assign-task-submit-btn"
          disabled={loading}
        >
          {loading ? "Please Wait" : "Assign Task"}
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
