import { Link } from "react-router-dom";

function Popup({ pet, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-popup" onClick={onClose}>
          &times;
        </span>

        <h2>{pet.name}</h2>

        <p>{pet.description}</p>

        <Link to="/adopt" className="popup-btn">
          Adopt Now
        </Link>
      </div>
    </div>
  );
}

export default Popup;
