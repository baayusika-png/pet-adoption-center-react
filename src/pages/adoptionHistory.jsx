import { useEffect, useState } from "react";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAdoptionHistory } from "../services/adoptService";

function AdoptionHistory() {
  const navigate = useNavigate();
  const [adoptions, setAdoptions] = useState([]); //Stores Adoption History
  const [loading, setLoading] = useState(true); //Tracks whether the data is being fetched from API
  const [error, setError] = useState(""); //Stores error message if  API call fails

  useEffect(() => {
    const fetchAdoptionHistory = async () => {
      try {
        const result = await getAdoptionHistory(); //Fetch adoption request from the API
        console.log(result);

        if (result.status === "success") {
          //Only shows approved adoption
          const approvedAdoptions = result.data.filter(
            (adoption) => adoption.status === "Approved",
          );

          setAdoptions(approvedAdoptions);
        } else {
          setError(result.message || "Failed to fetch adoption history");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptionHistory();
  }, []);

  return (
    <div className="adoption-history-page">
      <button className="history-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <div className="history-header">
        <h1>Adoption History</h1>

        <p>
          Your adoption history shows the pets you've welcomed into your life,
          <br />
          along with the dates and details of each adoption. It's a record of
          love,
          <br />
          care, and the special companions you've chosen to bring home.
        </p>
      </div>

      <div className="history-section-title">
        <h2>Your Adopted Pets History</h2>
      </div>

      <div className="history-content">
        {loading && <p>Loading adoption history...</p>}
        {!loading && error && <p className="history-error">{error}</p>}
        {!loading && !error && adoptions.length === 0 && (
          <p className="no-adoption">You haven't adopted any pets yet.</p>
        )}

        {!loading &&
          !error &&
          adoptions.map((adoption) => (
            <div className="history-pet-card" key={adoption.id}>
              <div className="history-pet-image">
                <img src={adoption.pet.image} alt={adoption.pet.pet_name} />
              </div>

              <div className="history-pet-info">
                <h3>{adoption.pet.pet_name}</h3>

                <p>
                  {adoption.pet.breed} • {adoption.pet.age} •{" "}
                  {adoption.pet.gender}
                </p>
              </div>
            </div>
          ))}

        {!loading && (
          <div className="browse-more-card">
            <div className="browse-heart">
              <FaHeart />
            </div>

            <h3>Ready for another?</h3>

            <p>
              There are always more furry
              <br />
              friends looking for a loving
              <br />
              home.
            </p>

            <button
              onClick={() => navigate("/pets")}
              className="browse-pets-btn"
            >
              Browse Pets
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdoptionHistory;
