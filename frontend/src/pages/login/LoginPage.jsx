import { Link, useNavigate } from "react-router-dom";
import "../../styleSheets/loginpage.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { message, success, ...usersData } = res.data;
      if (success) {
        toast.success(message);
        dispatch(loginSuccess(usersData));
        navigate("/");
        setUser({ email: "", password: "" });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div>
        <div className="login-div">
          <h1>
            Login <span>Todo Board</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="input-div">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="input-div">
              <label>Password</label>
              <input
                type="Password"
                placeholder="Enter your Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <Link to={"/signup"} className="link">
              Don't have an account ? Signup
            </Link>
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? <>Please Wait</> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
