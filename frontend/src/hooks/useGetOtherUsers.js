import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/slices/authSlice";
import { BACKEND_API_URL } from "../utils/constant";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URLL}/users`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setOtherUsers(res.data.otherUsers));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
