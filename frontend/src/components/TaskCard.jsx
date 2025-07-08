import { useDrag } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const priorityMap = {
    1: "High",
    2: "Intermediate",
    3: "Low",
  };
  return (
    <div
      className="kanban-task"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="kanban-task-heading">
        <h1>
          {task.title.length > 20
            ? task.title.slice(0, 18) + "..."
            : task.title}
        </h1>
        <div
          className="kanban-task-priorityBadge"
          style={{
            backgroundColor:
              task?.priority === 1
                ? "#ef4444"
                : task?.priority === 2
                ? "#3b82f6"
                : "#22c55e",
          }}
        >
          {priorityMap[task?.priority]}
        </div>
      </div>
      <p className="kanban-task-description">{task.description}</p>
      <div className="kanban-task-content">
        <p>assigned To : {task.assignedUser.name}</p>
      </div>
    </div>
  );
};

export default TaskCard;
