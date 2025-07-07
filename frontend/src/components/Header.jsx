import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
const Header = () => {
  return (
    <div className="header">
      <h1>Todo Board</h1>
      <Link className="logout-link">
        <>
          <LogOut color="black" />
          Logout
        </>
      </Link>
    </div>
  );
};

export default Header;
