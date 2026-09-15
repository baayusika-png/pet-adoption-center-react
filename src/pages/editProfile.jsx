import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/profileService";

function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
          const data = result.data;

          // Set the user's existing profile information
          setFormData({
            fullName: data.name || "",
            phone: data.phone || "",
          });

          // Set the existing profile image if available
          if (data.profile_pic) {
            setProfileImage(data.profile_pic);
          }
        } else {
          // Show the error message from the backend
          setError(result.message || "Failed to fetch profile");
        }
      } catch (error) {
        // Store the error message if fetching the profile fails
        setError(error.message);
      } finally {
        // Stop showing the loading state
        setLoading(false);
      }
    };

    // Call the function to fetch the profile
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open the file picker to select a new profile photo
  const handleChangePhoto = () => {
    fileInputRef.current.click();
  };

  // Handle the selected profile photo
  const handlePhotoChange = (e) => {
    // Get the selected file
    const file = e.target.files[0];

    // Check if a file was selected
    if (file) {
      // Create a temporary URL to display the selected image
      const imageUrl = URL.createObjectURL(file);

      // Show the selected image
      setProfileImage(imageUrl);

      // Store the selected file for uploading
      setSelectedFile(file);
    }
  };

  // Handle profile form submission
  const handleSubmit = async (e) => {
    // Prevent the page from refreshing
    e.preventDefault();

    // Show the saving state
    setSaving(true);

    // Clear any previous error message
    setError("");

    try {
      // Create FormData to send text and image data
      const data = new FormData();

      // Add the user's name
      data.append("name", formData.fullName);

      // Add the user's phone number
      data.append("phone", formData.phone);

      // Add the new profile image if one was selected
      if (selectedFile) {
        data.append("image", selectedFile);
      }

      // Send the updated profile to the backend
      const result = await updateProfile(data);

      // Check if the profile was updated successfully
      if (result.status === "success") {
        navigate("/profile");
      } else {
        // Show the error message from the backend
        setError(result.message || "Failed to update profile");
      }
    } catch (error) {
      // Store the error message if updating the profile fails
      setError(error.message);
    } finally {
      // Stop showing the saving state
      setSaving(false);
    }
  };

  return (
    <div className="edit-profile-page">
      <button className="edit-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <div className="edit-profile-card">
        <h1>Edit Profile</h1>

        <p className="edit-profile-subtitle">
          Update your personal information to help us match you with the perfect
          pet.
        </p>

        {loading && <p>Loading profile...</p>}
        {!loading && error && <p className="edit-profile-error">{error}</p>}
        {!loading && (
          <>
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

            <form onSubmit={handleSubmit}>
              <div className="edit-form-grid">
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
              </div>

              <div className="edit-form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
