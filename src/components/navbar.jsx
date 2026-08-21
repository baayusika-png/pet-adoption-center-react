import { Link, NavLink } from "react-router-dom";
import { FaBars, FaPaw } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">
          <h2>
            <FaPaw />
            AdoptMe
          </h2>
        </Link>

        <ul className={isOpen ? "nav-links active" : "nav-links"}>
          <li>
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/pets" onClick={() => setIsOpen(false)}>
              Pets
            </NavLink>
          </li>

          <li>
            <NavLink to="/adopt" onClick={() => setIsOpen(false)}>
              Adopt
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>

        <div className="nav-buttons">
          {user ? (
            <div className="user-avatar" onClick={() => navigate("/profile")}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-nav">
                Login
              </Link>

              <Link to="/register" className="btn-nav secondary">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
