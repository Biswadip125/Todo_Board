import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { setTasks } from "../redux/slices/taskSlice";
const useDeleteTask = () => {
  const dispatch = useDispatch();

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/tasks/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          setTasks((prevState) => prevState.filter((task) => task._id !== id))
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Failed to delete the tasks");
    }
  };
  return { deleteTask };
};

export default useDeleteTask;
