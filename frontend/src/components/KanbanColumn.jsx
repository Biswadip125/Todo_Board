import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";
import { useDispatch } from "react-redux";
import { updateTaskStatusInStore } from "../redux/slices/taskSlice";

const KanbanColumn = ({ status, tasks, onDropTask }) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: async (draggedItem) => {
      const updatedTask = await onDropTask(draggedItem.id, status);
      if (updatedTask) {
        dispatch(
          updateTaskStatusInStore({
            id: updatedTask._id,
            status: updatedTask.status,
          })
        );
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
        {tasks.length > 0 ? (
          tasks?.map((task) => <TaskCard task={task} key={task._id} />)
        ) : (
          <p
            style={{ textAlign: "center", marginTop: "10px", fontSize: "18px" }}
          >
            No Tasks yet
          </p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
