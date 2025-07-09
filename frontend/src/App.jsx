import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Signup from "./pages/signup/Signup";
import { useSelector } from "react-redux";
import DnDWrapperDashboard from "./components/DnDWrapperDashboard";
import AssignTask from "./pages/AssignTask/AssignTask";
import TaskModificationPage from "./pages/TaskModificationPage/TaskModificationPage";

function App() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <DnDWrapperDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/assign-task"
            element={
              isAuthenticated ? <AssignTask /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/edit/:id"
            element={
              isAuthenticated ? (
                <TaskModificationPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
