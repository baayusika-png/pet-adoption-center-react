import {
  FaArrowLeft,
  FaUser,
  FaHeart,
  FaFileAlt,
  FaCalendarAlt,
  FaHistory,
  FaArrowRight,
  FaEdit,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <main className="profile-content">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>

        <div className="profile-title">
          <FaUser />
          <h2>My Profile</h2>
        </div>

        <div className="user-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="user-info">
            <p>
              <strong>{user?.name}</strong>
            </p>
            <p>
              <strong>{user?.email}</strong>
            </p>
            <p>
              <strong>{user?.phone}</strong>
            </p>
          </div>

          <div className="profile-actions">
            <button className="edit-btn">
              <FaEdit />
              Edit Profile
            </button>

            <button className="password-btn">
              <FaKey />
              Change Password
            </button>
          </div>
        </div>

        <div className="profile-options">
          <div className="profile-option">
            <div className="option-icon">
              <FaHeart />
            </div>

            <p>My Wishlist</p>

            <FaArrowRight
              className="option-arrow"
              onClick={() => navigate("/wishlist")}
            />
          </div>

          <div className="profile-option">
            <div className="option-icon">
              <FaFileAlt />
            </div>

            <p>My Applications</p>

            <FaArrowRight className="option-arrow" />
          </div>

          <div className="profile-option">
            <div className="option-icon">
              <FaCalendarAlt />
            </div>

            <p>My Appointments</p>

            <FaArrowRight className="option-arrow" />
          </div>

          <div className="profile-option">
            <div className="option-icon">
              <FaHistory />
            </div>

            <p>Adoption History</p>

            <FaArrowRight className="option-arrow" />
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            const confirmLogout = window.confirm(
              "Are you sure you want to logout?",
            );

            if (confirmLogout) {
              logout();
            }
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </main>
    </div>
  );
}

export default Profile;
