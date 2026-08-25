import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMinus, FaPlus, FaCartShopping } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

function PetFoodDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get food data from the food card
  const food = location.state?.food;

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // If no food data is available
  if (!food) {
    return (
      <div className="food-not-found">
        <h2>Food not found</h2>
        <button onClick={() => navigate("/food")}>Back to Food</button>
      </div>
    );
  }

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="food-detail-page">
      {/* Back Button */}
      <button className="food-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <div className="food-detail-container">
        {/* Left - Image */}
        <div className="food-detail-image">
          {food.image ? (
            <img src={food.image} alt={food.name} />
          ) : (
            <div className="food-detail-placeholder"></div>
          )}
        </div>

        {/* Right - Details */}
        <div className="food-detail-content">
          <h1>{food.name}</h1>

          {/* Rating */}
          <div className="detail-rating">
            <FaStar className="rating-star" />
            <span>{food.rating || 4.8}</span>
          </div>

          {/* Price */}
          <h2 className="detail-price">${food.price}</h2>

          {/* Description */}
          <p className="detail-description">
            Provide your furry companion with the balanced nutrition they
            deserve. {food.name} is crafted with real ingredients and essential
            nutrients to support a healthy, happy, and active pet.
          </p>

          {/* Suitable For */}
          <div className="suitable-section">
            <h4>Suitable For</h4>

            <div className="suitable-tags">
              <span>🐶 Adult Dogs</span>
              <span>🐾 All Breeds</span>
            </div>
          </div>

          <div className="detail-divider"></div>

          {/* Bottom Actions */}
          <div className="detail-actions">
            {/* Quantity */}
            <div className="quantity-box">
              <button onClick={decreaseQuantity}>
                <FaMinus />
              </button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>
                <FaPlus />
              </button>
            </div>

            {/* Add Cart */}
            <button className="add-cart-btn">
              <FaCartShopping />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetFoodDetail;
