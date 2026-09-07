import { useState } from "react";
import { FaKey, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/passwordService";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation(); //Used to access the current route's state
  const email = location.state?.email || ""; //Get email from fogetPassword if no email then empty string
  const [otp, setOtp] = useState(""); //Stores the OTP entered by user

  //Handle OTP form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check if OTP field is empty
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    //OTP must contain excatly 6 digits
    if (otp.length !== 6) {
      alert("OTP must be 6 digits.");
      return;
    }

    try {
      //Send email and OTP to backend for verification
      const result = await verifyOtp(email, otp);

      //Check whether OTP verification was sucessfull
      if (result.status === "success") {
        alert("OTP verified successfully!");

        //Store the customer ID in session storage
        sessionStorage.setItem("customerId", result.customer_id);

        navigate("/resetPassword");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="forgot-icon">
          <FaKey />
        </div>

        <h1>Verify OTP</h1>

        <p className="forgot-description">
          We've sent a 6-digit verification code to
          <br />
          <strong>{email || "your email address"}</strong>
          <br />
          Enter the code below to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="forgot-form-group">
            <label htmlFor="otp">Verification Code</label>

            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);

                setOtp(value);
              }}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          </div>

          <button type="submit" className="reset-btn">
            Verify OTP
            <FaArrowRight />
          </button>
        </form>

        <button
          className="back-login-btn"
          onClick={() => navigate("/forgetPassword")}
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      <p className="support-text">
        Didn't receive the code? <span>Resend OTP</span>
      </p>
    </div>
  );
}

export default VerifyOTP;
