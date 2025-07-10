import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTasks } from "../redux/slices/taskSlice";
import { BACKEND_API_URL } from "../utils/constant";

const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateTask = async (updatedTaskData, id) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/tasks/${id}`,
        updatedTaskData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          setTasks((prevState) =>
            prevState.map((task) =>
              task._id === res.data.task._id ? res.data.task : task
            )
          )
        );
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return { updateTask, loading };
};

export default useUpdateTask;
