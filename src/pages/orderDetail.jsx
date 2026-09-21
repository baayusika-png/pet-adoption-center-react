import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaCheck,
  FaTruck,
  FaBox,
  FaMapMarkerAlt,
  FaCreditCard,
  FaInfoCircle,
} from "react-icons/fa";

import { getOrders } from "../services/orderService";

function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  // Stores order fetched from backend
  const [order, setOrder] = useState(null);

  // Stores loading state
  const [loading, setLoading] = useState(true);

  // Stores error message
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = sessionStorage.getItem("token");

      // Redirect to login if user is not logged in
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Get orders from backend
        const result = await getOrders(token, 1);

        // Find the selected order using URL order ID
        const selectedOrder = result.orders?.find(
          (item) => String(item.order_id) === String(orderId),
        );

        // If order was not found
        if (!selectedOrder) {
          setError("Order details could not be found.");
          setOrder(null);
          return;
        }

        // Store selected order
        setOrder(selectedOrder);
      } catch (error) {
        console.error("Fetch order details error:", error);

        setError(error.message || "Failed to load order details");

        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [navigate, orderId]);

  // Format backend date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Order tracking steps
  const statusSteps = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  // Current order status
  const currentStatus = order?.status?.toLowerCase();

  // Find current status position
  const statusIndex = statusSteps.findIndex(
    (status) => status.toLowerCase() === currentStatus,
  );

  // Total amount
  const totalAmount = Number(order?.total_amount || 0);
  // Subtotal from backend
  const subtotal = Number(order?.subtotal || 0);
  // Delivery charge from backend
  const deliveryCharge = Number(order?.delivery_charge || 0);

  if (loading) {
    return (
      <section className="order-details-page">
        <button
          className="order-details-back"
          onClick={() => navigate("/order")}
        >
          <FaArrowLeft /> Back to My Orders
        </button>

        <div className="order-details-error">
          <h2>Loading order details...</h2>
          <p>Please wait while we load your order.</p>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="order-details-page">
        <button
          className="order-details-back"
          onClick={() => navigate("/order")}
        >
          <FaArrowLeft /> Back to My Orders
        </button>

        <div className="order-details-error">
          <h2>Order details unavailable</h2>

          <p>{error || "The requested order could not be found."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="order-details-page">
      <button className="order-details-back" onClick={() => navigate("/order")}>
        <FaArrowLeft /> Back to My Orders
      </button>
      <div className="order-details-header">
        <div>
          <h1>Order #{order.order_id}</h1>

          <p>Order No: {order.order_no || "N/A"}</p>

          <p>Placed on {formatDate(order.created_at)}</p>
        </div>

        <div className="order-header-amount">
          <span>TOTAL AMOUNT</span>

          <strong>Rs. {totalAmount.toLocaleString()}</strong>
        </div>
      </div>

      <div className="order-tracking-card">
        <h2>Order Status</h2>

        {currentStatus === "cancelled" ? (
          <div className="order-status-message">
            <FaInfoCircle />

            <div>
              <strong>Your order has been cancelled.</strong>

              <p>This order is no longer being processed.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="order-tracking">
              {statusSteps.map((status, index) => {
                const completed = statusIndex !== -1 && index <= statusIndex;

                const active = index === statusIndex;

                return (
                  <div
                    className={`tracking-step ${
                      completed ? "completed" : ""
                    } ${active ? "active" : ""}`}
                    key={status}
                  >
                    <div className="tracking-icon">
                      {completed ? (
                        <FaCheck />
                      ) : index === 3 ? (
                        <FaTruck />
                      ) : (
                        <FaBox />
                      )}
                    </div>

                    <span>{status}</span>

                    {active && <small>Current Status</small>}
                  </div>
                );
              })}
            </div>

            <div className="order-status-message">
              <FaInfoCircle />

              <div>
                <strong>
                  {currentStatus === "delivered"
                    ? "Your order has been delivered!"
                    : currentStatus === "shipped"
                      ? "Your order has been shipped!"
                      : currentStatus === "processing"
                        ? "Your order is being processed."
                        : currentStatus === "confirmed"
                          ? "Your order has been confirmed."
                          : "Your order has been placed successfully."}
                </strong>

                <p>
                  {currentStatus === "delivered"
                    ? "Thank you for shopping with us."
                    : "You can check your order status here for updates."}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="order-details-layout">
        <div className="order-products-section">
          <h2>Items in your order</h2>

          {order.items?.map((item) => (
            <div className="order-product-card" key={item.order_item_id}>
              <div className="order-product-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <FaBox />
                )}
              </div>

              <div className="order-product-info">
                <h3>{item.name}</h3>

                <p>Qty: {item.quantity}</p>

                <p>Price: Rs. {Number(item.price || 0).toLocaleString()}</p>
              </div>

              <strong className="order-product-price">
                Rs.{" "}
                {Number(
                  item.subtotal ??
                    Number(item.price || 0) * Number(item.quantity || 0),
                ).toLocaleString()}
              </strong>
            </div>
          ))}
        </div>

        <div className="order-details-sidebar">
          <div className="order-sidebar-card">
            <h2>
              <FaMapMarkerAlt />
              Order Information
            </h2>

            <div className="delivery-info">
              <strong>Order #{order.order_id}</strong>

              <p>Order No: {order.order_no || "N/A"}</p>

              <p>Status: {order.status || "N/A"}</p>

              <p>Updated: {formatDate(order.updated_at)}</p>
            </div>
          </div>

          <div className="order-sidebar-card">
            <h2>
              <FaCreditCard />
              Payment Summary
            </h2>

            <div className="payment-row">
              <span>Subtotal</span>

              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="payment-row">
              <span>Shipping</span>

              <span>
                {deliveryCharge === 0
                  ? "Free"
                  : `Rs. ${deliveryCharge.toLocaleString()}`}
              </span>
            </div>

            <div className="payment-total">
              <span>Total</span>

              <strong>Rs. {totalAmount.toLocaleString()}</strong>
            </div>

            {order.payments?.length > 0 ? (
              <div className="order-payment-method">
                <FaCreditCard />

                <div>
                  <span>
                    Paid via {order.payments[0].payment_method || "N/A"}
                  </span>

                  <span>
                    Payment Status: {order.payments[0].status || "N/A"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="order-payment-method">
                <FaCreditCard />

                <span>Payment information not available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
