import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaTruck,
  FaCreditCard,
  FaWallet,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { getCart, getSavedAddresses } from "../services/cartServices";
import { createOrder, getCheckoutDetails } from "../services/orderService";

import { createPayment, createStripePayment } from "../services/paymentService";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the checkout page was opened using the BuyNow button
  const buyNow = location.state?.buyNow || false;

  // Get the food details passed from BuyNow button
  const buyNowFood = location.state?.food || null;

  // Get the number of items selected from BuyNow
  const buyNowQuantity = location.state?.quantity || 1;

  // Keep the user's saved addresses here
  const [addresses, setAddresses] = useState([]);

  // Keep the product that are being purchases here
  const [items, setItems] = useState([]);

  // Set the payment option selected by the user
  const [paymentMethod, setPaymentMethod] = useState("online");

  // Store delivery information
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
  });

  //Save the orderId in state afte order is created
  const [orderId, setOrderId] = useState(null);
  //Save the paymentId in state after payment is created
  const [paymentId, setPaymentId] = useState(null);

  // Prevent double submits / re-entrant submits while a request is in flight
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Get the information needed for the checkout page
  useEffect(() => {
    const fetchCheckoutData = async () => {
      // Get logged-in user's token
      const token = sessionStorage.getItem("token");

      // Redirect to login if token is missing
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Check whether this is a Buy Now checkout
        if (buyNow && buyNowFood) {
          // Get Buy Now checkout details
          const checkoutResult = await getCheckoutDetails(
            buyNowFood.id,
            buyNowQuantity,
            token,
          );

          // Store Buy Now items
          setItems(checkoutResult.items || []);
        } else {
          // Get cart items
          const cartResult = await getCart(token);

          // Store cart items
          setItems(cartResult.data?.items || []);
        }

        // Get saved addresses
        const addressResult = await getSavedAddresses(token);

        // Store addresses
        setAddresses(addressResult.data || []);
      } catch (error) {
        // Clear checkout data
        setItems([]);
        setAddresses([]);

        // Show error message
        alert(error.message || "Failed to load checkout details");
      }
    };

    fetchCheckoutData();
  }, [navigate, buyNow, buyNowFood, buyNowQuantity]);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0,
  );

  // Find selected address
  const selectedAddress = addresses.find(
    (address) => address.city === formData.city,
  );

  // Get delivery charge
  const deliveryFee = selectedAddress
    ? Number(selectedAddress.delivery_charge?.amount || 0)
    : 0;

  // Calculate final total
  const total = subtotal + deliveryFee;

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard against double-clicks / re-entrant submits
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Get authentication token
    const token = sessionStorage.getItem("token");

    // Redirect to login if token is missing
    if (!token) {
      navigate("/login");
      setIsSubmitting(false);
      return;
    }

    try {
      // Find selected delivery address
      const selectedAddress = addresses.find(
        (address) => address.city === formData.city,
      );

      // Check selected address
      if (!selectedAddress) {
        alert("Please select a delivery address.");

        setIsSubmitting(false);
        return;
      }

      let currentOrderId = orderId;

      if (!currentOrderId) {
        let orderData;

        // Prepare Buy Now order
        if (buyNow) {
          // Check Buy Now item
          if (!buyNowFood) {
            alert("Buy Now item not found.");

            setIsSubmitting(false);
            return;
          }

          // Create Buy Now order data
          orderData = {
            food_id: buyNowFood.id,
            quantity: buyNowQuantity,
            delivery_address_id: selectedAddress.id,
          };
        } else {
          // Get cart item IDs
          const cartItemIds = items.map((item) => item.cart_item_id);

          // Check cart
          if (cartItemIds.length === 0) {
            alert("Your cart is empty.");

            setIsSubmitting(false);
            return;
          }

          // Create cart order data
          orderData = {
            delivery_address_id: selectedAddress.id,
            cart_item_ids: cartItemIds,
          };
        }

        // Create order
        const orderResult = await createOrder(orderData, token);

        // Get order ID
        currentOrderId = orderResult.order?.order_id;

        // Check order ID
        if (!currentOrderId) {
          throw new Error("Order ID was not returned.");
        }

        // Remember it so a retry after this point doesn't re-create the order
        setOrderId(currentOrderId);
      }

      // Convert frontend payment method to backend payment method
      const selectedPaymentMethod =
        paymentMethod === "online" ? "Stripe" : "Cash";

      let currentPaymentId = paymentId;

      if (!currentPaymentId) {
        const paymentResult = await createPayment(
          currentOrderId,
          selectedPaymentMethod,
          token,
        );

        currentPaymentId = paymentResult.payment?.id;

        // Check payment ID
        if (!currentPaymentId) {
          throw new Error("Payment ID was not returned.");
        }

        setPaymentId(currentPaymentId);
      }

      if (selectedPaymentMethod === "Stripe") {
        // Call Stripe API
        const stripeResult = await createStripePayment(currentPaymentId, token);

        // Get Stripe Checkout URL
        const stripeUrl = stripeResult.payment?.payment_url;

        // Check Stripe URL
        if (!stripeUrl) {
          throw new Error("Stripe Checkout URL was not returned.");
        }
        window.location.href = stripeUrl;

        return;
      }

      navigate("/orderSucess", {
        state: {
          total: total,
        },
      });
    } catch (error) {
      alert(error.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <button
          type="button"
          className="checkout-back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>

        <h1 className="checkout-title">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="checkout-layout">
            <div className="checkout-left">
              <div className="checkout-card">
                <h2>
                  <FaTruck />
                  Delivery Information
                </h2>

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Street Address</label>

                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Enter your street address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Delivery City</label>

                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your city</option>

                    {addresses.map((address) => (
                      <option key={address.id} value={address.city}>
                        {address.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="checkout-card payment-card">
                <h2>
                  <FaCreditCard />
                  Payment Method
                </h2>

                <label
                  className={`payment-option ${
                    paymentMethod === "online" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <FaCreditCard />

                  <span>Online Payment — Pay securely using Stripe</span>
                </label>

                <label
                  className={`payment-option ${
                    paymentMethod === "cash" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <FaMoneyBillWave className="cash-icon" />

                  <span>Cash on Delivery — Pay when your order arrives</span>
                </label>
              </div>
            </div>

            <div className="checkout-summary">
              <h2>
                <FaWallet style={{ marginRight: "8px" }} />
                Order Summary
              </h2>

              <div className="checkout-items">
                {items.map((item) => (
                  <div
                    className="checkout-item"
                    key={item.cart_item_id || item.food_id || item.id}
                  >
                    <div className="checkout-item-image">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.food_name || item.name}
                        />
                      ) : (
                        <div className="checkout-placeholder" />
                      )}
                    </div>

                    <div className="checkout-item-info">
                      <h3>{item.food_name || item.name}</h3>

                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <div className="checkout-item-price">
                      Rs.{" "}
                      {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-divider" />

              <div className="checkout-summary-row">
                <span>Subtotal</span>

                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>

              <div className="checkout-summary-row">
                <span>Delivery Charge</span>

                <span>Rs. {deliveryFee.toFixed(2)}</span>
              </div>

              <div className="checkout-total">
                <span>Total</span>

                <span>Rs. {total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing..."
                  : paymentMethod === "online"
                    ? "Proceed to Payment"
                    : "Place Order"}

                <FaArrowRight />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
