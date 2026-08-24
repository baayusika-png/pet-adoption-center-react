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
        <h1>Track Application</h1>
        <p>
          Track the status of your recent adoption requests and get ready to
          welcome your new family member.
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

export default History;
