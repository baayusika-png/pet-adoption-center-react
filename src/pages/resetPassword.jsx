import { useState } from "react";
import { FaArrowLeft, FaEyeSlash, FaLock, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/passwordService";

function ResetPassword() {
  const navigate = useNavigate();

  const [showNew, setShowNew] = useState(false); //Control whether new password is visible 
  const [showConfirm, setShowConfirm] = useState(false); //Control whether confirm password is visible
  const [loading, setLoading] = useState(false); //Track the loading state while API request is running

  //Store the password in form data
  const [formData, setFormData] = useState({
    customerId: "",
    newPassword: "",
    confirmPassword: "",
  });

  //Handle changes in password input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Handle reset password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check whether new password has atleast 8 character
    if (formData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    //Check if both password match
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    //Get customer Id after sucessful OTP verification
    const customerId = sessionStorage.getItem("customerId");

    console.log("Customer ID:", customerId);

    //Stops if customer Id is not available
    if (!customerId) {
      alert("Customer ID not found. Please verify OTP again.");
      navigate("/forgetPassword");
      return;
    }

    setLoading(true);//Start loading state while calling the API 

    try {
    //Send customer Id and new password details to the reset password API
      const result = await resetPassword(
        customerId,
        formData.newPassword,
        formData.confirmPassword,
      );

      console.log("Reset Password Result:", result);

      //Check whether the password was sucessfully reset
      if (result.status === "success") {
        alert("Password reset successfully.");

        //Remove customer ID after sucessful password reset
        sessionStorage.removeItem("customerId");

        navigate("/login");
      } else {
        alert(result.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <button
        className="change-password-back"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft />
      </button>

      <div className="change-password-card">
        <h1>Reset Password</h1>

        <p className="change-password-subtitle">
          Ensure your account stays secure by using a strong password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="password-field">
            <label>New Password</label>

            <div className="password-input-wrapper">
              <FaLock className="password-left-icon" />

              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="Create a new password"
                value={formData.newPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-eye"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <small>Must be at least 8 characters long.</small>
          </div>

          <div className="password-field">
            <label>Confirm New Password</label>

            <div className="password-input-wrapper">
              <FaLock className="password-left-icon" />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-eye"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <div className="change-password-buttons">
            <button
              type="button"
              className="cancel-password-btn"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-password-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
