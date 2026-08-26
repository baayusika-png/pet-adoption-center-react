import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "NutriPaws Premium Feast",
      price: 4500,
      quantity: 1,
      image: "",
    },
    {
      id: 2,
      name: "NutriPaws Premium Feast",
      price: 1200,
      quantity: 2,
      image: "",
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = cartItems.length > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;

  return (
    <section className="cart-page">
      <div className="cart-container">
        <button className="cart-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className="cart-header">
          <h1>My Cart</h1>
          <p>Review your items before proceeding to checkout.</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart.</p>

                <button onClick={() => navigate("/food")}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="cart-image-placeholder"></div>
                    )}
                  </div>

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <span className="cart-item-price">
                      Rs. {item.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="cart-delete-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash />
                  </button>

                  <div className="cart-quantity-control">
                    <button onClick={() => decreaseQuantity(item.id)}>−</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee.toLocaleString()}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
              <FaArrowRight />
            </button>

            <p className="secure-text">♙ Secure checkout guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
