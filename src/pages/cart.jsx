import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  deleteCartItem,
  clearCartItems,
} from "../services/cartServices";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.cart_item_id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.cart_item_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      await deleteCartItem(id, token);

      setCartItems((items) => items.filter((item) => item.cart_item_id !== id));
    } catch (error) {
      return;
    }
  };

  const clearCart = async () => {
    const token = sessionStorage.getItem("token");

    try {
      await clearCartItems(token);
      setCartItems([]);
    } catch (error) {
      return;
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    const fetchCart = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const result = await getCart(token);

        setCartItems(result.data?.items || []);
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  if (loading) {
    return (
      <section className="cart-page">
        <div className="cart-container">
          <h2>Loading cart ....</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-container">
        <button className="cart-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className="cart-header">
          <h1>My Cart</h1>

          <div className="cart-header-row">
            <p>Review your items before proceeding to checkout.</p>

            <button className="cart-header-empty" onClick={clearCart}>
              Empty Cart <FaTrash />
            </button>
          </div>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart.</p>

                <button onClick={() => navigate("/petFood")}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item.cart_item_id}>
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
                    onClick={() => removeItem(item.cart_item_id)}
                  >
                    <FaTrash />
                  </button>

                  <div className="cart-quantity-control">
                    <button onClick={() => decreaseQuantity(item.cart_item_id)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.cart_item_id)}>
                      +
                    </button>
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

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
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
