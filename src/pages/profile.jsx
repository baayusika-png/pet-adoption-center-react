import {
  FaArrowLeft,
  FaUser,
  FaHeart,
  FaFileAlt,
  FaBone,
  FaHistory,
  FaArrowRight,
  FaEdit,
  FaSignOutAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/profileService";
import { useEffect, useState } from "react";

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [avatarError, setAvatarError] = useState(false);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the user's profile when the page loads
  useEffect(() => {
    // Get the profile data from the backend
    const fetchProfile = async () => {
      try {
        // Request the user's profile
        const result = await getProfile();

        // Check if the profile was fetched successfully
        if (result.status === "success") {
          setProfile(result.data);
        } else {
          // Show the error message from the backend
          setError(result.message || "Failed to fetch profile");
        }
      } catch (error) {
        // Store the error message if the request fails
        setError(error.message);
      } finally {
        // Stop showing the loading state
        setLoading(false);
      }
    };

    // Call the function to fetch the profile
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      await logout();
      navigate("/");
    }
  };

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

        {loading && <p>Loading profile...</p>}
        {!loading && error && <p className="profile-error">{error}</p>}
        {!loading && !error && profile && (
          <div className="user-card">
            <div className="profile-avatar">
              {profile?.profile_pic && !avatarError ? (
                <img
                  src={profile.profile_pic}
                  alt={profile.name}
                  onError={() => setAvatarError(true)}
                />
              ) : (
                profile?.name?.charAt(0).toUpperCase()
              )}
            </div>

            <div className="user-info">
              <p>
                <strong>{profile?.name}</strong>
              </p>
              <p>
                <strong>{profile?.email}</strong>
              </p>
              <p>
                <strong>{profile?.phone}</strong>
              </p>
            </div>

            <div className="profile-actions-wrap">
              <div className="profile-actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate("/editProfile")}
                >
                  <FaEdit />
                  Edit Profile
                </button>
              </div>

              <div className="profile-actions-secondary">
                <button
                  className="address-btn"
                  onClick={() => navigate("/myAddresses")}
                >
                  <FaMapMarkerAlt />
                  View My Delivery Addresses
                </button>
              </div>
            </div>
          </div>
        )}

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

            <p>Track My Application</p>

            <FaArrowRight
              className="option-arrow"
              onClick={() => navigate("/trackApplication")}
            />
          </div>

          <div className="profile-option">
            <div className="option-icon">
              <FaHistory />
            </div>

            <p>Adoption History</p>

            <FaArrowRight
              className="option-arrow"
              onClick={() => navigate("/adoptionHistory")}
            />
          </div>

          <div className="profile-option">
            <div className="option-icon">
              <FaBone />
            </div>

            <p>My Order</p>

            <FaArrowRight
              className="option-arrow"
              onClick={() => navigate("/order")}
            />
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </main>
    </div>
  );
}

export default Profile;
