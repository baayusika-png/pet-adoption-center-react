import { FaPaw, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PetCard({ pet, onFavorite }) {
  const navigate = useNavigate();

  const handleAdopt = () => {
    navigate(`/pet/${pet.id}`, { state: { pet } });
  };

  return (
    <div className="animal-card">
      <div className="animal-image">
        <img src={pet.image} alt={pet.pet_name} className="animal-photo" />

        <button
          className={`heart-btn ${pet.isFavorite ? "liked" : ""}`}
          onClick={() => onFavorite(pet)}
        >
          <FaRegHeart />
        </button>

        <span
          className={`badge ${pet.vaccinated ? "vaccinated" : "not-vaccinated"}`}
        >
          {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
        </span>
      </div>

      <div className="card-body">
        <div className="card-top">
          <span className="animal-name">{pet.pet_name}</span>
          <span className={`badge ${pet.status?.toLowerCase()}`}>
            {pet.status}
          </span>
        </div>

        <p className="animal-details">
          {pet.breed} • {pet.age} • {pet.gender}
        </p>

        <button className="adopt-btn" onClick={handleAdopt}>
          <FaPaw />
          Adopt Me
        </button>
      </div>
    </div>
  );
}

export default PetCard;
