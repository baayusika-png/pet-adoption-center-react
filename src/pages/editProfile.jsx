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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile();
        console.log("Profile:", result);

        if (result.status === "success") {
          const data = result.data;

          setFormData({
            fullName: data.name || "",
            phone: data.phone || "",
          });

          if (data.profile_pic) {
            setProfileImage(data.profile_pic);
          }
        } else {
          setError(result.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.fullName);
      data.append("phone", formData.phone);

      if (selectedFile) {
        data.append("image", selectedFile);
      }
      const result = await updateProfile(data);
      console.log("Update result:", result);

      if (result.status === "success") {
        navigate("/profile");
      } else {
        setError(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setError(error.message);
    } finally {
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
