import { useState } from "react";
import { FaLock, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    // Later you can call your forgot password API here
    console.log("Reset password request for:", email);
  };

  return (
    <div className="forgot-password-page">

      <div className="forgot-password-card">

        {/* Lock Icon */}
        <div className="forgot-icon">
          <FaLock />
        </div>

        {/* Heading */}
        <h1>Forgot Password?</h1>

        <p className="forgot-description">
          Don't worry, it happens to the best of us. Enter your
          <br />
          email address and we'll send you a link to reset your
          <br />
          password.
        </p>

        {/* Form */}
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

          {/* Reset Button */}
          <button type="submit" className="reset-btn">
            Send Reset Link
            <FaArrowRight />
          </button>

        </form>

        {/* Back to Login */}
        <button
          className="back-login-btn"
          onClick={() => navigate("/login")}
        >
          <FaArrowLeft />
          Back to Login
        </button>

      </div>

      {/* Support */}
      <p className="support-text">
        Need more help?{" "}
        <span>Contact Support</span>
      </p>

    </div>
  );
}

export default ForgotPassword;