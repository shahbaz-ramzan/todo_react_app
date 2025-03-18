import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.css";
import { getToken, removeToken } from "../../utils/generalUtility";
import CreateModal from "../create/CreateTask";
import { Button } from "antd";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!getToken());

  useEffect(() => {
    const token = getToken();
    if (!token && location.pathname !== "/login") {
      navigate("/login");
    }
    setIsUserAuthenticated(!!token);
  }, [location.pathname, isUserAuthenticated]);

  const handleLogout = () => {
    removeToken();
    setIsUserAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
        <li>{<CreateModal />}</li>
        {!isUserAuthenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <Button onClick={handleLogout} type="primary">
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
