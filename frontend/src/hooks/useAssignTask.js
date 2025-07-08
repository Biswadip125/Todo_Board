import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/slices/taskSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAssignTask = () => {
  const [loading, setLoading] = useState(false);
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignTask = async (task) => {
    setLoading(true);
    console.log(task);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tasks/",
        task,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setTasks([...tasks, res.data.task]));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Failed to assign the task");
    } finally {
      setLoading(false);
    }
  };

  return { loading, assignTask };
};

export default useAssignTask;
