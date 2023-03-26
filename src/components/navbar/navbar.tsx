import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const history = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Music Quiz App
        </Link>

        <ul className="navbar-menu">
          {isLoggedIn && (
            <>
              <Link to="/top-players" className="navbar-logo">
                Top Players
              </Link>
              <li className="navbar-item">
                <span
                  onClick={() => {
                    localStorage.removeItem("token");
                    history("/login");
                  }}
                  className="navbar-link"
                >
                  Logout
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
