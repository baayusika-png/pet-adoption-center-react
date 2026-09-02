import { useEffect, useState } from "react";
import { FaArrowLeft, FaClock } from "react-icons/fa";
import { getAdoptionHistory } from "../services/adoptService";

function TrackApplication() {
  const [pendingAdoptions, setPendingAdoptions] = useState([]); //Stores pending adoption request
  const [loading, setLoading] = useState(true); //Tracks whether the data is being fetched from APi
  const [error, setError] = useState(""); //Stores error message if API call fails

  useEffect(() => {
    const fetchPendingAdoptions = async () => {
      try {
        const result = await getAdoptionHistory(); //Fetch adoption request from API

        console.log("Adoption Requests:", result);
        if (result.status === "success") {
          //Only shows pending adoption
          const pending = result.data.filter(
            (adoption) =>
              adoption.status === "Pending" || adoption.status === "Rejected",
          );

          setPendingAdoptions(pending);
        } else {
          setError(result.message || "Failed to fetch adoption requests");
        }
      } catch (error) {
        console.error("Pending adoption error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAdoptions();
  }, []);

  return (
    <div className="history-page">
      <button className="back-btn" onClick={() => window.history.back()}>
        <FaArrowLeft />
      </button>

      <div className="history-header">
        <h1>Track Application</h1>
        <p>
          Track the status of your recent adoption requests and get ready to
          welcome your new family member.
        </p>
      </div>

      <div className="history-content">
        <div className="application-section">
          <h2>Your Adoption Application</h2>

          {loading && <p>Loading your applications...</p>}
          {!loading && error && <p className="history-error">{error}</p>}
          {!loading && !error && pendingAdoptions.length === 0 && (
            <p className="no-adoption">
              You don't have any pending adoption applications right now.
            </p>
          )}

          {!loading &&
            !error &&
            pendingAdoptions.map((adoption) => (
              <div className="pending-pet-card" key={adoption.id}>
                <div className="pending-pet-image">
                  <img src={adoption.pet.image} alt={adoption.pet.pet_name} />
                </div>

                <div className="pending-pet-info">
                  <h3>{adoption.pet.pet_name}</h3>
                  <p>
                    {adoption.pet.breed} • {adoption.pet.age} •{" "}
                    {adoption.pet.gender}
                  </p>
                  <p className="pending-reason-text">{adoption.reason}</p>
                </div>

                <span
                  className={`pending-status-badge ${
                    adoption.status === "Rejected"
                      ? "rejected-badge"
                      : adoption.status === "Pending"
                        ? "approved-badge"
                        : ""
                  }`}
                >
                  <FaClock /> {adoption.status}
                </span>
              </div>
            ))}
        </div>

        <div className="next-section">
          <h3>What Happens Next?</h3>

          <div className="step">
            <div className="number">1</div>

            <div>
              <h4>Application Submitted</h4>
              <p>
                Your adoption application submitted is now waiting for review.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="number">2</div>

            <div>
              <h4>Application Review</h4>
              <p>
                Our team reviews your application and checks whether you are
                suitable to adopt the selected pet.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="number">3</div>

            <div>
              <h4>Meet & Greet</h4>
              <p>
                If your application is approved, you can meet the pet and spend
                some time together.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="number">4</div>

            <div>
              <h4>Home Check</h4>
              <p>
                A quick home check may be arranged to make sure the environment
                is safe and suitable for the pet.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="number">5</div>

            <div>
              <h4>Adoption Approved</h4>
              <p>
                Once everything is approved, complete the required paperwork and
                adoption process to bring your new pet home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackApplication;
