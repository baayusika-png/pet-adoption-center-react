import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getOrders, cancelOrder } from "../services/orderService";

function Orders() {
  const navigate = useNavigate();

  // Stores orders fetched from the backend
  const [orders, setOrders] = useState([]);

  // Stores loading state
  const [loading, setLoading] = useState(true);

  // Stores error message
  const [error, setError] = useState("");

  // Stores current page and pagination info returned by the API
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        const result = await getOrders(token, page);

        // Store orders returned by API
        setOrders(result.orders || []);

        // Store pagination info returned by API
        setTotalPages(result.pagination?.total_pages || 1);
      } catch (error) {
        console.error("Fetch orders error:", error);

        setError(error.message || "Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, page]);

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

    if (formattedStatus === "pending") {
      return "order-pending";
    }

    if (formattedStatus === "confirmed") {
      return "order-confirmed";
    }

    if (formattedStatus === "processing") {
      return "order-processing";
    }

    if (formattedStatus === "shipped") {
      return "order-shipped";
    }

    if (formattedStatus === "delivered") {
      return "order-delivered";
    }

    if (formattedStatus === "cancelled") {
      return "order-cancelled";
    }

    return "order-default";
  };

  // Check whether order can be cancelled
  const canCancelOrder = (status) => {
    return status?.toLowerCase() === "pending";
  };

  // Handle order cancellation
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Call backend PATCH API
      const result = await cancelOrder(token, orderId);

      // Update order only after backend successfully cancels it
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId
            ? {
                ...order,
                status: result.order.status,
              }
            : order,
        ),
      );

      alert(result.message || "Order cancelled successfully.");
    } catch (error) {
      console.error("Cancel order error:", error);

      alert(error.message || "Failed to cancel order");
    }
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
              onClick={() => navigate("/petFood")}
            >
              Continue Shopping
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <>
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
                      ) : order.status?.toLowerCase() === "cancelled" ? (
                        <FaTimesCircle />
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

                    <div className="order-actions">
                      <button
                        type="button"
                        className="order-details-btn"
                        onClick={() =>
                          navigate(`/order-details/${order.order_id}`, {
                            state: { order },
                          })
                        }
                      >
                        View Details
                      </button>

                      {canCancelOrder(order.status) && (
                        <button
                          type="button"
                          className="order-cancel-btn"
                          onClick={() => handleCancelOrder(order.order_id)}
                        >
                          <FaTimesCircle />
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="order-pagination">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Orders;
