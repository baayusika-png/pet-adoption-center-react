import React, { useRef, useState } from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open file picker
  const handleChangePhoto = () => {
    fileInputRef.current.click();
  };

  // Handle selected photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setProfileImage(null);
    fileInputRef.current.value = "";
  };

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Profile Data:", formData);
    console.log("Profile Image:", profileImage);

    // API call can be added here
  };

  return (
    <div className="edit-profile-page">
      {/* Back Button */}
      <button className="edit-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      {/* Edit Profile Card */}
      <div className="edit-profile-card">
        <h1>Edit Profile</h1>

        <p className="edit-profile-subtitle">
          Update your personal information to help us match you with the perfect
          pet.
        </p>

        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <div className="profile-picture">
            {profileImage ? (
              <img src={profileImage} alt="Profile" />
            ) : (
              <FaUser className="default-user-icon" />
            )}
          </div>

          <div className="profile-picture-info">
            <h3>Profile Picture</h3>

            <p>A friendly photo helps shelters get to know you.</p>

            <div className="photo-buttons">
              <button
                type="button"
                className="change-photo-btn"
                onClick={handleChangePhoto}
              >
                Change Photo
              </button>

              <button
                type="button"
                className="remove-photo-btn"
                onClick={handleRemovePhoto}
              >
                Remove
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="edit-form-grid">
            {/* Full Name */}
            <div className="edit-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="edit-form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* Phone */}
            <div className="edit-form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>

            {/* Address */}
            <div className="edit-form-group">
              <label>Address</label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                autoComplete="street-address"
              />
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="edit-form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
