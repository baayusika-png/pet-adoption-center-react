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

  //Increase the quantity of cart item
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.cart_item_id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  //Decrese the quantity of cart item
  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.cart_item_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  //Remove one item from cart
  const removeItem = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      await deleteCartItem(id, token);

      //Remove the item from the cart on the screen
      setCartItems((items) => items.filter((item) => item.cart_item_id !== id));
    } catch (error) {
      return; //Stop if removing the item fails
    }
  };

  //Remove all items from the cart
  const clearCart = async () => {
    const token = sessionStorage.getItem("token");

    try {
      await clearCartItems(token);
      setCartItems([]); //Clear all items from the screen
    } catch (error) {
      return;  //Stop if clearing the cart fails
    }
  };

  //Calculate the total price of all cart items
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  //Fetch the cart items when the age loads
  useEffect(() => {
    //Get the cart items from backend
    const fetchCart = async () => {
      const token = sessionStorage.getItem("token");

      //Redirect to login if the user is not looged in
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        //Get the user's cart from the backend
        const result = await getCart(token);

        setCartItems(result.data?.items || []); //Store the cart items in state
      } catch (error) {
        return; //Stop if loading the cart fails
      } finally { 
        setLoading(false); //Stop showing the loading message
      }
    };
  
    //Call the function to fetch the cart
    fetchCart();
  }, [navigate]);

  //Show loading mesaage while the cart is being fetched
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
              disabled={cartItems.length === 0}
              onClick={() => {
                if (cartItems.length === 0) {
                  return;
                }

                navigate("/checkout");
              }}
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
