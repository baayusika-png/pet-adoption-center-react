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
import { getCart, getCities } from "../services/cartServices";

function Checkout() {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
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
    const fetchCart = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const result = await getCart(token);
        setItems(result.data?.items || []);
      } catch (error) {
        setItems([]);
      }
    };

    fetchCart();
  }, [navigate]);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = 150;
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
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
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
