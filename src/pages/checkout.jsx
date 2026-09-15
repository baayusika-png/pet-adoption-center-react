import { useEffect, useState } from "react";
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

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check whether the user came here through the Buy Now button
  const buyNow = location.state?.buyNow || false;

  // Food ID and quantity passed from PetFoodDetail
  const buyNowFood = location.state?.food || null;
  const buyNowQuantity = location.state?.quantity || 1;

  // Stores the logged-in user's saved delivery addresses
  const [addresses, setAddresses] = useState([]);

  // Stores items that will be displayed in the checkout summary
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
        /*
         * If the user clicked Buy Now,
         * get checkout information for only that food item.
         */
        if (buyNow && buyNowFood) {
          const checkoutResult = await getCheckoutDetails(
            buyNowFood.id,
            buyNowQuantity,
            token,
          );

          /*
           * checkout.php returns the selected item
           * inside the "items" array.
           */
          setItems(checkoutResult.items || []);
        } else {
          /*
           * Normal cart checkout.
           * Get all cart items.
           */
          const cartResult = await getCart(token);

          setItems(cartResult.data?.items || []);
        }

        // Fetch saved delivery addresses
        const addressResult = await getSavedAddresses(token);

        setAddresses(addressResult.data || []);
      } catch (error) {
        console.error("Checkout data error:", error);

        setItems([]);
        setAddresses([]);

        alert(error.message || "Failed to load checkout details");
      }
    };

    fetchCheckoutData();
  }, [navigate, buyNow, buyNowFood, buyNowQuantity]);

  /*
   * Calculate subtotal.
   *
   * Number() is used because API prices can come
   * as strings such as "500.00".
   */
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0,
  );

  // Find the selected address from saved addresses
  const selectedCity = addresses.find((addr) => addr.city === formData.city);

  // Get delivery charge based on selected city
  const deliveryFee = selectedCity
    ? Number(selectedCity.delivery_charge?.amount || 0)
    : 0;

  // Calculate final total
  const total = subtotal + deliveryFee;

  // Update the form data when the user changes an input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the order submission
  const handleSubmit = async (e) => {
    // Prevent the page from refreshing
    e.preventDefault();

    // Get the logged-in user's token
    const token = sessionStorage.getItem("token");

    // Redirect to login if the user is not logged in
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Find the selected saved address
      const selectedAddress = addresses.find(
        (addr) => addr.city === formData.city,
      );

      // Make sure an address has been selected
      if (!selectedAddress) {
        alert("Please select a delivery address.");
        return;
      }

      // Create an object to store the order information
      let orderData;

      // Check if the user is buying one item directly
      if (buyNow) {
        // Make sure the selected food item exists
        if (!buyNowFood) {
          alert("Buy Now item not found.");
          return;
        }

        // Store the Buy Now order information
        orderData = {
          food_id: buyNowFood.id,
          quantity: buyNowQuantity,
          delivery_address_id: selectedAddress.id,
        };
      } else {
        // Get the IDs of all items in the cart
        const cartItemIds = items.map((item) => item.cart_item_id);

        // Make sure the cart contains items
        if (cartItemIds.length === 0) {
          alert("Your cart is empty.");
          return;
        }

        // Store the cart order information
        orderData = {
          delivery_address_id: selectedAddress.id,
          cart_item_ids: cartItemIds,
        };
      }

      // Send the order data to the backend
      const result = await createOrder(orderData, token);

      // Go to the Order Success page after creating the order
      navigate("/orderSucess");
    } catch (error) {
      // Show an error message if placing the order fails
      alert(error.message || "Failed to place order");
    }
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
                    <p
                      style={{
                        color: "red",
                        marginTop: "6px",
                      }}
                    >
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
              {items.map((item, index) => (
                <div
                  className="checkout-item"
                  key={item.cart_item_id || item.food_id || index}
                >
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
                    Rs. {Number(item.price).toLocaleString()}
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
