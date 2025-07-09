import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import "../../styleSheets/dashboardpage.css";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { setTasks } from "../../redux/slices/taskSlice";
import toast from "react-hot-toast";
import KanbanColumn from "../../components/KanbanColumn";
import { Link } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";
import { BACKEND_API_URL } from "../../utils/constant";

const DashboardPage = () => {
  const { user } = useSelector((store) => store.auth);
  const tasks = useSelector((store) => store.task.tasks);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  useGetOtherUsers();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/tasks`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setTasks(res.data.tasks));
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Failed to fetch tasks");
    }
  }, [dispatch]);

  const onDropTask = async (id, status) => {
    try {
      const res = await axios.put(
        `${BACKEND_API_URL}/tasks/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        return res.data.task;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    socket?.on("taskCreated", (task) => {
      console.log("task appeared");
      dispatch(setTasks((prevState) => [...prevState, task]));
    });

    return () => {
      socket?.off("taskCreated");
    };
  }, [socket, dispatch, tasks]);

  useEffect(() => {
    socket?.on("taskStatusUpdated", (updatedTask) => {
      console.log("task appeared");
      dispatch(
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        )
      );
    });
    return () => {
      socket?.off("taskStatusUpdated");
    };
  }, [socket, dispatch, tasks]);

  const todoTasks = tasks?.filter((task) => task?.status === "Todo");
  const inProgressTasks = tasks?.filter(
    (task) => task?.status === "In Progress"
  );
  const completedTasks = tasks?.filter((task) => task?.status === "Done");

  return (
    <div className="container">
      <Header />
      <div className="dashboard-header">
        <h1 className="heading">Welcome {user.name}, 🖐️</h1>
        <Link to={"/assign-task"}>
          <button>Assign Task</button>
        </Link>
      </div>
      <div className="kanban-board">
        {["Todo", "In Progress", "Done"].map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            onDropTask={onDropTask}
            tasks={
              status === "Todo"
                ? todoTasks
                : status === "In Progress"
                ? inProgressTasks
                : completedTasks
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
