import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

const KanbanColumn = ({
  status,
  tasks,
  onDropTask,
  updateTaskStatus,
  fetchTasks,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: async (draggedItem) => {
      const updatedTask = await onDropTask(draggedItem.id, status);
      if (updatedTask) {
        fetchTasks();
        updateTaskStatus(updatedTask, draggedItem.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  return (
    <div
      ref={drop}
      className="kanban-column"
      style={{ backgroundColor: isOver ? "#f0f0f0" : "white" }}
    >
      <h2>{status}</h2>
      <div className="kanban-tasks">
        {tasks?.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
