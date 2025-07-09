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
import Header from "./components/Header";
import ActionLog from "./pages/ActionLog/ActionLog";

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
                <>
                  <Header />
                  <DnDWrapperDashboard />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/assign-task"
            element={
              isAuthenticated ? (
                <>
                  <Header /> <AssignTask />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit/:id"
            element={
              isAuthenticated ? (
                <>
                  <Header />
                  <TaskModificationPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/logs"
            element={
              <>
                <Header /> <ActionLog />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
