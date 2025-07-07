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
  return (
    <div
      className="kanban-task"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {task.title}
    </div>
  );
};

export default TaskCard;
