import { Link, useNavigate } from "react-router-dom";
import "../../styleSheets/signuppage.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_API_URL } from "../../utils/constant";
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_API_URL}/auth/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        setUser({
          name: "",
          email: "",
          password: "",
        });
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
        <div className="signup-div">
          <h1>
            Signup <span>Todo Board</span>
          </h1>
          <form>
            <div className="input-div">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="input-div">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="input-div">
              <label>Password</label>
              <input
                type="Password"
                placeholder="Enter your Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <Link to={"/login"} className="link">
              Already have an account? Login
            </Link>
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <>Please Wait</> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
