import { Link } from "react-router-dom";
import "../../styleSheets/signuppage.css";
const Signup = () => {
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
              <input type="text" />
            </div>
            <div className="input-div">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="input-div">
              <label>Password</label>
              <input type="Password" />
            </div>
            <Link to={"/login"} className="link">
              Already have an account? Login
            </Link>
            <button className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
