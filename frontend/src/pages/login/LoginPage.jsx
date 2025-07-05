import { Link } from "react-router-dom";
import "../../styleSheets/loginpage.css";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-div">
              <label>Password</label>
              <input
                type="Password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to={"/signup"} className="link">
              Don't have an account ? Signup
            </Link>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
