import {
  FaHandPaper,
  FaUserCheck,
  FaHeart,
  FaGavel,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();

  return (
    <div className="terms-page">
      <div className="terms-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <h1>Terms and Conditions</h1>
      </div>

      {/* Terms Content */}
      <div className="terms-container">
        {/* Introduction */}
        <div className="terms-card">
          <h2>
            <FaHandPaper className="terms-icon green" />
            <span>1. Introduction</span>
          </h2>

          <p>
            Welcome to Paws & Home. These Terms and Conditions govern your use
            of our website and services. By accessing or using our platform, you
            agree to be bound by these terms, which are designed to ensure a
            safe, joyful, and responsible environment for both our users and our
            rescued animals.
          </p>

          <p>
            If you do not agree with any part of these terms, please refrain
            from using our services.
          </p>
        </div>

        {/* User Eligibility */}
        <div className="terms-card">
          <h2>
            <FaUserCheck className="terms-icon green" />
            <span>2. User Eligibility</span>
          </h2>

          <p>
            To use our adoption services, you must be at least 18 years of age
            and capable of forming a binding contract. By submitting an adoption
            application, you represent and warrant that you meet these
            requirements and that all information provided is accurate and
            truthful.
          </p>
        </div>

        {/* Adoption Process */}
        <div className="terms-card highlighted">
          <h2>
            <FaHeart className="terms-icon orange" />
            <span>3. Adoption Process & Policies</span>
          </h2>

          <p>
            Our primary commitment is to animal welfare. The adoption process
            involves several steps to ensure the best possible match for both
            the pet and the adopter.
          </p>

          <ul>
            <li>
              <strong>Application Review:</strong> All applications are
              thoroughly reviewed by our team. We reserve the right to approve
              or deny any application based on our assessment of the animal's
              needs and the potential home environment.
            </li>

            <li>
              <strong>Meet and Greet:</strong> A mandatory meet-and-greet
              session is required before final approval.
            </li>

            <li>
              <strong>Adoption Fees:</strong> Fees are non-refundable and go
              directly towards the care, vaccination, and spaying/neutering of
              our rescued animals.
            </li>

            <li>
              <strong>Return Policy:</strong> If an adoption does not work out,
              the animal MUST be returned to Paws & Home. They may not be given
              away or sold.
            </li>
          </ul>
        </div>

        {/* User Conduct */}
        <div className="terms-card">
          <h2>
            <FaGavel className="terms-icon green" />
            <span>4. User Conduct</span>
          </h2>

          <p>
            Users agree to interact with our platform and staff respectfully.
            Any form of harassment, submission of fraudulent information, or
            misuse of our platform will result in immediate termination of
            services and potential legal action.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
