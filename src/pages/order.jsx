import { FaArrowLeft, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const orders = [
    {
      id: "#PH-88932",
      date: "Oct 24, 2024",
      status: "Out for Delivery",
      statusType: "delivery",
      items: [
        {
          name: "Premium Kibble (10kg)",
          quantity: 1,
        },
        {
          name: "Chew Toys Bundle",
          quantity: 2,
        },
      ],
      total: 4500,
    },
    {
      id: "#PH-87112",
      date: "Oct 10, 2024",
      status: "Delivered",
      statusType: "delivered",
      items: [
        {
          name: "Orthopedic Dog Bed (Large)",
          quantity: 1,
        },
      ],
      total: 6200,
    },
  ];

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

        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-top">
                <div>
                  <p className="order-number">ORDER {order.id}</p>

                  <p className="order-date">Placed on {order.date}</p>
                </div>

                <div
                  className={`order-status ${
                    order.statusType === "delivery"
                      ? "order-delivery"
                      : "order-delivered"
                  }`}
                >
                  {order.statusType === "delivery" ? (
                    <FaTruck />
                  ) : (
                    <FaCheckCircle />
                  )}

                  {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <span>{item.name}</span>

                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-bottom">
                <div className="order-total">
                  <span>Total Amount</span>
                  <strong>Rs. {order.total.toLocaleString()}</strong>
                </div>

                <button
                  className="order-details-btn"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Details
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Orders;
