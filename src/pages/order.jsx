import { useEffect, useState } from "react";
import { FaArrowLeft, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/orderService";

function Orders() {
  const navigate = useNavigate();

  // Stores orders fetched from the backend
  const [orders, setOrders] = useState([]);

  // Stores loading state
  const [loading, setLoading] = useState(true);

  // Stores error message
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
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
        const result = await getOrders(token);

        // Store orders returned by API
        setOrders(result.orders || []);
      } catch (error) {
        console.error("Fetch orders error:", error);

        setError(error.message || "Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Format backend date for displaying
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status class based on order status
  const getStatusClass = (status) => {
    const formattedStatus = status?.toLowerCase();

    if (formattedStatus === "delivered") {
      return "order-delivered";
    }

    return "order-delivery";
  };

  return (
    <section className="order-page">
      <div className="order-container">
        <button className="order-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className="order-header">
          <h1>My Orders</h1>

          <p>
            Track your recent food and supply purchases for your furry friends.
          </p>
        </div>

        {loading && (
          <div className="order-message">
            <p>Loading your orders...</p>
          </div>
        )}

        {!loading && error && (
          <div className="order-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="order-message">
            <p>You have not placed any orders yet.</p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/pet-food")}
            >
              Continue Shopping
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="order-list">
            {orders.map((order) => (
              <div className="order-card" key={order.order_id}>
                <div className="order-top">
                  <div>
                    <p className="order-date">Order #{order.order_id}</p>

                    <p className="order-date">
                      Placed on {formatDate(order.created_at)}
                    </p>
                  </div>

                  <div
                    className={`order-status ${getStatusClass(order.status)}`}
                  >
                    {order.status?.toLowerCase() === "delivered" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTruck />
                    )}

                    {order.status}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div className="order-item" key={item.order_item_id}>
                      <span>{item.name}</span>

                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="order-bottom">
                  <div className="order-total">
                    <span>Total Amount</span>

                    <strong>
                      Rs. {Number(order.total_amount).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
