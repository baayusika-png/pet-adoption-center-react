import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import {
  getSavedAddresses,
  addAddress,
  editAddress,
  deleteAddress,
} from "../services/cartServices";

const emptyForm = {
  full_name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postal_code: "",
  is_default: false,
};

function MyAddresses() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchAddresses = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const result = await getSavedAddresses(token);
      setAddresses(result.data || []);
    } catch (err) {
      console.error("Fetch addresses error:", err);
      setError(err.message || "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (addr) => {
    setEditingId(addr.id);
    setForm({
      full_name: addr.full_name || "",
      phone: addr.phone || "",
      address: addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      postal_code: addr.postal_code || "",
      is_default: !!addr.is_default,
    });
    setFormError("");
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setFormError("");

    const token = sessionStorage.getItem("token");

    try {
      if (editingId) {
        await editAddress(editingId, form, token);
      } else {
        await addAddress(form, token);
      }

      await fetchAddresses();
      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      console.error("Save address error:", err);
      setFormError(err.message || "Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmDelete) return;

    const token = sessionStorage.getItem("token");

    try {
      await deleteAddress(id, token);
      await fetchAddresses();
    } catch (err) {
      console.error("Delete address error:", err);
      alert(err.message || "Failed to delete address");
    }
  };

  return (
    <div className="addresses-page">
      <div className="addresses-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className="addresses-title">
          <FaMapMarkerAlt />
          <h2>My Delivery Addresses</h2>
        </div>

        <button className="add-new-address-btn" onClick={openAddModal}>
          <FaPlus /> Add New Address
        </button>

        {loading && <p>Loading addresses...</p>}
        {!loading && error && <p className="addresses-error">{error}</p>}

        {!loading && !error && addresses.length === 0 && (
          <div className="addresses-empty">
            <p>You have no saved delivery addresses yet.</p>
          </div>
        )}

        {!loading && !error && addresses.length > 0 && (
          <div className="addresses-list">
            {addresses.map((addr) => (
              <div className="address-card" key={addr.id}>
                {addr.is_default && (
                  <span className="default-badge">
                    <FaStar /> Default
                  </span>
                )}

                <p className="address-name">{addr.full_name}</p>
                <p className="address-phone">{addr.phone}</p>
                <p className="address-line">
                  {addr.address}, {addr.city}, {addr.state} {addr.postal_code}
                </p>

                <div className="address-card-actions">
                  <button
                    className="address-edit-btn"
                    onClick={() => openEditModal(addr)}
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    className="address-delete-btn"
                    onClick={() => handleDelete(addr.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="address-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>
            <div className="address-modal-header">
              <h2>{editingId ? "Edit Address" : "Add Delivery Address"}</h2>

              <button
                type="button"
                className="address-modal-close"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="address-modal-form">
              {formError && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {formError}
                </p>
              )}

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postal_code"
                  value={form.postal_code}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <label className="address-default-check">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={form.is_default}
                  onChange={handleFormChange}
                />
                <span>Set as default address</span>
              </label>

              <button
                type="submit"
                className="place-order-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Address"
                    : "Save Address"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAddresses;
