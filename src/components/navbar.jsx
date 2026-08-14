import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <h2>Adopt Me</h2>
        </div>

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
          <Link to="/login" className="btn-nav">
            Login
          </Link>

          <Link to="/register" className="btn-nav secondary">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
