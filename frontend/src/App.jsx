import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Signup from "./pages/signup/Signup";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
