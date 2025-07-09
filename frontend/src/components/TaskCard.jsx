import { useDrag } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";
import { useSelector } from "react-redux";
import { Delete, PenBoxIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import useDeleteTask from "../hooks/useDeleteTask";

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
  const authUser = useSelector((store) => store.auth.user);
  const { deleteTask } = useDeleteTask();
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
      <p className="kanban-task-description">{task?.description}</p>
      <div className="kanban-task-content">
        <p>
          assigned To :{" "}
          {task?.assignedUser?._id === authUser.id
            ? "you"
            : task.assignedUser.name}
        </p>
        <div className="kanban-task-modify-icons">
          <Link
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            to={`/edit/${task._id}`}
          >
            <PenBoxIcon size={18} color="blue" />
          </Link>

          <Trash2Icon
            size={18}
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => deleteTask(task?._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
