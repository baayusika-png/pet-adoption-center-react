import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaTruck,
  FaCreditCard,
  FaWallet,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCart, getSavedAddresses } from "../services/cartServices";

function Checkout() {
  const navigate = useNavigate();

  // Stores the logged-in user's saved delivery addresses
  const [addresses, setAddresses] = useState([]);

  // Stores cart items
  const [items, setItems] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("online");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
  });

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const token = sessionStorage.getItem("token");

      // Redirect user to login if there is no token
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch cart items
        const cartResult = await getCart(token);
        setItems(cartResult.data?.items || []);

        // Fetch saved delivery addresses from the backend
        const addressResult = await getSavedAddresses(token);
        setAddresses(addressResult.data || []);
      } catch (error) {
        console.error("Checkout data error:", error);

        setItems([]);
        setAddresses([]);
      }
    };

    fetchCheckoutData();
  }, [navigate]);

  // Calculate cart subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Find the selected address from backend addresses (matched by city)
  const selectedCity = addresses.find((addr) => addr.city === formData.city);

  // Get delivery charge of selected address's city
  const deliveryFee = selectedCity
    ? Number(selectedCity.delivery_charge?.amount || 0)
    : 0;

  // Calculate final total
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order placed successfully!");
  };

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <button className="checkout-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <div className="checkout-left">
            <form onSubmit={handleSubmit}>
              <div className="checkout-card">
                <h2>
                  <FaTruck />
                  Delivery Information
                </h2>

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Street Address</label>

                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City</label>

                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a city</option>

                    {addresses
                      .filter(
                        (addr, index, self) =>
                          index ===
                          self.findIndex((item) => item.city === addr.city),
                      )
                      .map((addr) => (
                        <option key={addr.id} value={addr.city}>
                          {addr.city}
                        </option>
                      ))}
                  </select>

                  {addresses.length === 0 && (
                    <p style={{ color: "red", marginTop: "6px" }}>
                      Delivery address not available. Please add a delivery
                      address from your profile first.
                    </p>
                  )}
                </div>
              </div>

              <div className="checkout-card payment-card">
                <h2>
                  <FaCreditCard />
                  Payment Method
                </h2>

                <label
                  className={
                    paymentMethod === "online"
                      ? "payment-option selected"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />

                  <FaWallet />

                  <span>Online Payment</span>
                </label>

                <label
                  className={
                    paymentMethod === "cash"
                      ? "payment-option selected"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />

                  <FaMoneyBillWave className="cash-icon" />

                  <span>Cash on Delivery</span>
                </label>
              </div>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {items.map((item) => (
                <div className="checkout-item" key={item.cart_item_id}>
                  <div className="checkout-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="checkout-placeholder"></div>
                    )}
                  </div>

                  <div className="checkout-item-info">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                  </div>

                  <span className="checkout-item-price">
                    Rs. {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-divider"></div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>

              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="checkout-summary-row">
              <span>Delivery Fee</span>

              <span>Rs. {deliveryFee.toLocaleString()}</span>
            </div>

            <div className="checkout-total">
              <span>Total</span>

              <span>Rs. {total.toLocaleString()}</span>
            </div>

            <button className="place-order-btn" onClick={handleSubmit}>
              Place Order
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
