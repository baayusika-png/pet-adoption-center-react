import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getAllFood } from "../services/foodService";
import { addToCart } from "../services/cartServices";

function Food() {
  const [selectedCategory, setSelectedCategory] = useState("All Foods");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const categories = [
    "All Foods",
    "Dog",
    "Cat",
    "Rabbit",
    "Hamster",
    "Guinea Pig",
    "Bird",
    "Fish",
    "Turtles",
  ];

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const result = await getAllFood();
        setFoods(result);
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods =
    selectedCategory === "All Foods"
      ? foods
      : foods.filter((food) => food.category?.name === selectedCategory);

  const handleAddToCart = async (food) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (food.status !== "Available") {
      return;
    }

    try {
      const result = await addToCart(food.id, 1, token);

      alert(result.message || "Food added to cart successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="food-page">
      <div className="food-container">
        <div className="food-header">
          <h1>Nourish Your Companion</h1>

          <p>
            High-quality, nutritious food for every stage of your pet's life.
            Carefully selected to
            <br />
            keep them healthy, happy, and full of energy.
          </p>
        </div>

        <button className="top-cart-btn" onClick={() => navigate("/cart")}>
          <FaCartShopping />
          <span>Cart</span>
        </button>

        <div className="food-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && (
          <div className="food-loading">
            <p>Loading foods...</p>
          </div>
        )}

        {!loading && (
          <div className="food-grid">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <div
                  className="food-card"
                  key={food.id}
                  onClick={() =>
                    navigate(`/food/${food.id}`, {
                      state: { food },
                    })
                  }
                >
                  <div className="food-image">
                    {food.image ? (
                      <img src={food.image} alt={food.food_name} />
                    ) : (
                      <div className="image-placeholder"></div>
                    )}
                  </div>

                  <div className="food-content">
                    <h3>{food.food_name}</h3>

                    <p className="food-description">{food.description}</p>

                    <div className="food-rating">
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

                    <div className="food-bottom">
                      <span className="food-price">NPR {food.price}</span>

                      <button
                        className="cart-btn"
                        disabled={food.status !== "Available"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(food);
                        }}
                      >
                        <FaCartShopping />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-foods">
                <p>No foods available in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Food;
