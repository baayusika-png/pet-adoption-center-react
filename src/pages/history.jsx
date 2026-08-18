import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function History() {
  return (
    <div className="history-page">
      <div className="back-btn">
        <Link to="/adopt">
          <FaArrowLeft />
        </Link>
      </div>

      <div className="history-header">
        <h1>Adoption History</h1>
        <p>
          Your adoption history shows the pets you've welcomed into your life,
          along with the dates and details of each adoption. It's a record of
          love, care, and the special companions you've chosen to bring home.
        </p>
      </div>

      <div className="history-content">
        <div className="application-section">
          <h2>Your Adoption Application</h2>
        </div>
        <div className="next-section">
          <h3>What Happens Next?</h3>

          <div className="step">
            <div className="number">1</div>

            <div>
              <h4>Application Review</h4>
              <p>
                Our team reviews your details to ensure your home is suitable
                for the pet. (1–3 days)
              </p>
            </div>
          </div>

          <div className="step">
            <div className="number">2</div>

            <div>
              <h4>Meet & Greet</h4>
              <p>
                We'll schedule a time for you and your family to meet the pet.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="number">3</div>

            <div>
              <h4>Home Check</h4>
              <p>
                A quick virtual visit to make sure your home is safe and ready.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="number">4</div>

            <div>
              <h4>Final Approval</h4>
              <p>
                Sign the paperwork, complete the adoption fee, and bring your
                new best friend home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
