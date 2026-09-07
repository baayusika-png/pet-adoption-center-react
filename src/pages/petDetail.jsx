import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { getPetById } from "../services/petsService";
import { FaBirthdayCake, FaVenusMars, FaPaw } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { useWishlist } from "../context/wishlistContext";

function PetDetails() {
  const { id } = useParams(); //Get the pet ID from the URL
  const navigate = useNavigate();
  const { user } = useAuth(); //Get the logged in user from AuthContext
  const { isInWishlist, toggleWishlist } = useWishlist(); //get wishlist from WishlistContext

  const [pet, setPet] = useState(null); //Stores the pet details
  const [loading, setLoading] = useState(true); //Track whether the pet data is still loading
  const [error, setError] = useState(null); //Store any error message

  //Fetch pet details whenever the pet ID changes
  useEffect(() => {
    getPetById(id)
      .then((data) => {
        setPet(data); //Stores pet data in state
        setLoading(false);
      })
      .catch((error) => {
        setError("Pet data could not load");
        setLoading(false); //Stop the loading state
      });
  }, [id]);

  //Handle the Adopt btn click
  const handleAdoptClick = () => {
    if (!user) {
      //Redirect to login if not logged in
      navigate("/login", { state: { from: `/adopt` } });
    } else {
      navigate(`/adopt`); //Go to adopt form if logged in
    }
  };

  //Handle clicking the heart button
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleWishlist(pet);
  };

  if (loading) return <p className="loading-text">Loading pet details...</p>; //Displays loading message while fetching pet data
  if (error) return <p className="error-text">{error}</p>; //Display error message if fetching fails
  if (!pet) return <p className="error-text">No pets found...</p>; //Display message if no pet data is available

  const liked = isInWishlist(pet.id); //Check whether this pet is already in the wishlist

  return (
    <div className="pet-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <div className="pet-details-container">
        <div className="pet-left">
          <div className="pet-detail-image">
            <img src={pet.image} alt={pet.pet_name} />
          </div>

          <div className="pet-description">
            <h3>Meet {pet.pet_name}</h3>
            <p>{pet.description}</p>
          </div>
        </div>

        <div className="pet-right">
          <div className="pet-basic-card">
            <div className="pet-title-row">
              <div>
                <h1>{pet.pet_name}</h1>
                <p>{pet.breed}</p>
              </div>

              <button className="pet-heart-btn" onClick={handleFavoriteClick}>
                {liked ? (
                  <FaHeart className="pet-heart liked" />
                ) : (
                  <FaRegHeart className="pet-heart" />
                )}
              </button>
            </div>

            <div className="pet-tags">
              <span>
                <FaBirthdayCake /> {pet.age}
              </span>
              <span>
                <FaVenusMars /> {pet.gender}
              </span>
              <span>
                <FaPaw /> {pet.category?.name}
              </span>
            </div>

            <button className="pet-adopt-btn" onClick={handleAdoptClick}>
              <FaPaw /> Adopt Me
            </button>
          </div>

          <div className="pet-info-card">
            <h3>Pet Information</h3>

            <div className="info-row">
              <div>
                <span className="info-label">Vaccination</span>
                <p>{pet.vaccinated ? "✓ Vaccinated" : "✗ Not Vaccinated"}</p>
              </div>

              <div>
                <span className="info-label">Availability</span>
                <p>
                  {pet.availability === "Available" ||
                  pet.status === "Available"
                    ? "✓ Available"
                    : "✗ Pending "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
