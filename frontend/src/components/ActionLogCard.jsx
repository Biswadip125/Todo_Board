import React from "react";

const ActionLogCard = ({ actionLog }) => {
  return (
    <div className="action-log-card">
      <div className="action-log-header">
        <h3 className="action-log-title">{actionLog.action}</h3>
        <span className="action-log-timestamp">
          {new Date(actionLog.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="action-log-description">{actionLog.description}</p>
      <div className="action-log-meta">
        <span>By:</span> {actionLog.user?.name || "Unknown User"}
      </div>
      {actionLog.task?.title && (
        <div className="action-log-meta">
          <span>Task:</span> {actionLog.task.title}
        </div>
      )}
    </div>
  );
};

export default ActionLogCard;
