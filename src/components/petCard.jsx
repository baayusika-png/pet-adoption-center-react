import {FaHome} from "react-icons/fa";

function PetCard({ pet, onAdopt }) {
  return (
    <div className="animal-card">
      <div className="animal-image">
        <img src={pet.image} alt={pet.pet_name} className="animal-photo" />
        <span className="badge vaccinated">Vaccinated</span>
      </div>

      <div className="card-body">
        <div className="card-top">
          <span className="animal-name">{pet.pet_name}</span>
          <span className="badge available">Available</span>
        </div>

        <p className="animal-details">
          {pet.breed} • {pet.age} • {pet.gender}
        </p>

        <button
          className="adopt-btn"
          onClick={() => onAdopt(pet)}
        >
          <FaHome />
          Adopt Me
        </button>
      </div>
    </div>
  );
}

export default PetCard;