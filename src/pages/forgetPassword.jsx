import { useState } from "react";
import { FaLock, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/passwordService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const result = await forgotPassword(email);
      console.log("Forgot Password Response:", result);

      if (result.status === "success") {
        console.log("OTP:", result.otp_code);
        navigate("/verify-otp", {
          state: {
            email: email,
          },
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="forgot-icon">
          <FaLock />
        </div>

        <h1>Forgot Password?</h1>

        <p className="forgot-description">
          Don't worry, it happens to the best of us. Enter your
          <br />
          email address and we'll send you a link to reset your
          <br />
          password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="forgot-form-group">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}

            {!loading && <FaArrowRight />}
          </button>
        </form>

        <button className="back-login-btn" onClick={() => navigate("/login")}>
          <FaArrowLeft />
          Back to Login
        </button>
      </div>

      <p className="support-text">
        Need more help? <span>Contact Support</span>
      </p>
    </div>
  );
}

export default ForgotPassword;
