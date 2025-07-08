import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/slices/authSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users", {
          withCredentials: true,
        });
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
