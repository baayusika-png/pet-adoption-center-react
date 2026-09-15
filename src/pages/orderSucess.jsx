import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the final total amount passed from Checkout
  const total = location.state?.total || 0;

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="check-outer">
          <div className="check-inner">
            <FaCheckCircle className="success-check-icon" />
          </div>
        </div>

        <h1 className="order-title">Order Placed Successfully!</h1>

        <p className="order-subtitle">
          Thank you for your order. Your pet's food is on its way.
        </p>

        <div className="order-total-row">
          <span className="order-total-label">Total Amount</span>

          <span className="order-total-value">
            Rs. {Number(total).toLocaleString()}
          </span>
        </div>

        <div className="order-actions">
          <button
            className="btn btn-primary-order"
            onClick={() => navigate("/order")}
          >
            View My Orders
          </button>

          <button
            className="btn btn-secondary-order"
            onClick={() => navigate("/petFood")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
