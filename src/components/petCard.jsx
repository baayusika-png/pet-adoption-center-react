import { FaPaw, FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext";

function PetCard({ pet }) {
  const navigate = useNavigate();

  //Get wishlist function from WishlistContext
  const { isInWishlist, toggleWishlist } = useWishlist();

  //Check whether this pet is already in the wishlist
  const liked = isInWishlist(pet.id);

  //Navigate to the pet details page when Adopt Me is clicked
  const handleAdopt = () => {
    navigate(`/pet/${pet.id}`, { state: { pet } });
  };

  //Handle clicking the heart button
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); //Prevent the click from triggering the parent card's click event
    toggleWishlist(pet); //Add or remove pet fro wishlist
  };

  return (
    <div className="animal-card">
      <div className="animal-image">
        <img src={pet.image} alt={pet.pet_name} className="animal-photo" />

        <button
          className={`heart-btn ${liked ? "liked" : ""}`}
          onClick={handleFavoriteClick}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
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
