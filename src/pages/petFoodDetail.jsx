import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft, FaMinus, FaPlus, FaCartShopping } from "react-icons/fa6";

import { FaStar } from "react-icons/fa";

import { getFoodById } from "../services/foodService";

function PetFoodDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // =====================================
  // FETCH FOOD BY ID
  // =====================================

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const result = await getFoodById(id);

        if (result?.data) {
          setFood(result.data);
        } else {
          setFood(result);
        }
      } catch (error) {
        console.error("Food Detail API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFood();
    }
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      }

      return prev;
    });
  };

  if (loading) {
    return (
      <div className="food-not-found">
        <h2>Loading food...</h2>
      </div>
    );
  }
  if (!food) {
    return (
      <div className="food-not-found">
        <h2>Food not found</h2>

        <button onClick={() => navigate("/food")}>Back to Food</button>
      </div>
    );
  }

  return (
    <div className="food-detail-page">
      <button className="food-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <div className="food-detail-container">
        <div className="food-detail-image">
          {food.image ? (
            <img src={food.image} alt={food.food_name} />
          ) : (
            <div className="food-detail-placeholder">
              <span>No Image</span>
            </div>
          )}
        </div>

        <div className="food-detail-content">
          <h1>{food.food_name}</h1>

          <div className="detail-rating">
            <span
              className={`available-badge ${
                food.status === "Available"
                  ? "available"
                  : food.status === "Inactive"
                    ? "inactive"
                    : "out_of_stock"
              }`}
            >
              {food.status}
            </span>
          </div>

          <h2 className="detail-price">NPR {food.price}</h2>

          <p className="detail-description">{food.description}</p>

          <div className="suitable-section">
            <h4>Suitable For</h4>

            <div className="suitable-tags">
              <span>{food.category?.name || "All Pets"}</span>

              <span>All Breeds</span>
            </div>
          </div>

          <div className="detail-divider"></div>

          <div className="detail-actions">
            <div className="quantity-box">
              <button onClick={decreaseQuantity}>
                <FaMinus />
              </button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>
                <FaPlus />
              </button>
            </div>

            <button
              className="add-cart-btn"
              disabled={food.status !== "Available"}
              onClick={() => {
                if (food.status !== "Available") {
                  return;
                }

                console.log("Add to cart:", {
                  food,
                  quantity,
                });
              }}
            >
              <FaCartShopping />

              {food.status === "Available" ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetFoodDetail;
