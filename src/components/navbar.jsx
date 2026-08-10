import { Link, NavLink } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <h2>Adopt Me</h2>
        </div>

        <ul className="nav-links" id="navLinks">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/pets">Pets</NavLink>
          </li>

          <li>
            <NavLink to="/adopt">Adopt</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        <i class="bx bx-menu menu-icon" id="menuIcon"></i>

        <Link to="/adopt" className="btn-nav">
          Adopt Now
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
