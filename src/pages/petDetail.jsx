import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";
import { getPetById } from "../services/petsService";
import { FaBirthdayCake, FaVenusMars, FaPaw } from "react-icons/fa";
import { useAuth } from "../context/authContext";

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPetById(id)
      .then((data) => {
        console.log("Pet data:", data);
        setPet(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching pet:", error);
        setError("Pet data load huna sakena");
        setLoading(false);
      });
  }, [id]);

  const handleAdoptClick = () => {
    if (!user) {
      navigate("/login", { state: { from: `/adopt` } });
    } else {
      navigate(`/adopt`);
    }
  };

  if (loading) return <p className="loading-text">Loading pet details...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!pet) return <p className="error-text">Pet fela pareन</p>;

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

              <FaRegHeart className="pet-heart" />
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

            <button className="meet-btn">Book Meet &amp; Greet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
