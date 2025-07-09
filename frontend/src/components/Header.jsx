import { Link, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/auth/logout`);

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Failed to logout");
    }
  };
  return (
    <div className="header">
      <h1>Todo Board</h1>
      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/assign-task" className="nav-link">
          Assign Task
        </NavLink>
        <NavLink to="/logs" className="nav-link">
          Action Logs
        </NavLink>
      </div>
      <Link className="logout-link">
        <>
          <LogOut color="black" onClick={handleLogout} />
          Logout
        </>
      </Link>
    </div>
  );
};

export default Header;
