import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft, FaMinus, FaPlus, FaCartShopping } from "react-icons/fa6";
import { getFoodById } from "../services/foodService";
import { addToCart } from "../services/cartServices";

function PetFoodDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  //Fetch the food details when the food ID changes
  useEffect(() => {
    //Get the selected food
    const fetchFood = async () => {
      try {
        const result = await getFoodById(id); //REquest food details using the foof ID

        //Check if the response contains food data
        if (result?.data) {
          setFood(result.data);
        } else {
          setFood(result);
        }
      } catch (error) {
        return; //Stop if loading the food fails
      } finally {
        setLoading(false); //Stop showing the loading message
      }
    };

    //Fetch food only when a Food ID is available
    if (id) {
      fetchFood();
    }
  }, [id]);

  //Increase the selected food quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  //Decrease the selected food quantity
  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        //Make sure the quntity does not go below 1
        return prev - 1;
      }
      //Keep the quantity at 1
      return prev;
    });
  };

  //Add the selected food to the cart
  const handleAddToCart = async () => {
    const token = sessionStorage.getItem("token"); //Get the user's login token

    //Redirect to login if the user is not logged in
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    //Stop if the food is not available
    if (food.status !== "Available") {
      return;
    }

    try {
      //Send the food and quantity to the backend
      const result = await addToCart(food.id, quantity, token);

      //Show a sucess message to the user
      alert(result.message || "Food added to cart successfully!");
    } catch (error) {
      //Show an error message if adding to cart fails
      alert(error.message);
    }
  };

  //Show a loading message while food details are being fetched
  if (loading) {
    return (
      <div className="food-not-found">
        <h2>Loading food...</h2>
      </div>
    );
  }

  //Show a message if the foof does not exist
  if (!food) {
    return (
      <div className="food-not-found">
        <h2>Food not found</h2>

        {/* Go back to the food listing page */}
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
              onClick={handleAddToCart}
            >
              <FaCartShopping />
              {food.status === "Available" ? "Add to Cart" : "Unavailable"}
            </button>

            <button
              className="buy-now-btn"
              disabled={food.status !== "Available"}
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    buyNow: true,
                    food: food,
                    quantity: quantity,
                  },
                })
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetFoodDetail;
