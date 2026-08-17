import { NavLink } from "react-router-dom";
import { FaPaw, FaCopyright } from "react-icons/fa";
import facebook from "../assets/images/facebook.jpg";
import tiktok from "../assets/images/tiktok.png";
import insta from "../assets/images/insta.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box brand">
          <h2 className="footer-logo">
            <FaPaw />
            AdoptMe
          </h2>
          <p>Every paw deserve a loving home.</p>
          <p className="copyright">
            {" "}
            <FaCopyright /> 2026 Adopt Me. All rights reserved.
          </p>
        </div>

        <div className="footer-box links">
          <h3>Quick Links</h3>
          <ul>
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
        </div>

        <div className="footer-box contact">
          <h3>Contact Us</h3>
          <p>+(977) 983546382</p>
          <p>adoptMe@gmail.com</p>
        </div>

        <div className="footer-box">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook" />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tiktok} alt="TikTok" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={insta} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
