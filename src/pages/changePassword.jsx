import { useState } from "react";
import {
  FaArrowLeft,
  FaKey,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function ChangePassword() {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    console.log("Password data:", formData);

    // API call will go here
  };

  return (
    <div className="change-password-page">

      <button
        className="change-password-back"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>

      <div className="change-password-card">

        <h1>Change Password</h1>

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
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-password-btn"
            >
              Update Password
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ChangePassword;