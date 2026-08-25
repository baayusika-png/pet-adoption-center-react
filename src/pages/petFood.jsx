import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Food() {
  const [selectedCategory, setSelectedCategory] = useState("All Foods");

  const categories = [
    "All Foods",
    "Dog",
    "Cat",
    "Rabbit",
    "Hamster",
    "Guinea Pig",
  ];

  const foods = [
    {
      id: 1,
      name: "Ocean Whitefish Pate",
      category: "Cat",
      description:
        "Smooth, savory wet food packed with essential nutrients and hydration.",
      price: 350,
      rating: 4.8,
      image: "",
    },
    {
      id: 2,
      name: "Ocean Whitefish Pate",
      category: "Cat",
      description:
        "Smooth, savory wet food packed with essential nutrients and hydration.",
      price: 350,
      rating: 4.8,
      image: "",
    },
    {
      id: 3,
      name: "Ocean Whitefish Pate",
      category: "Cat",
      description:
        "Smooth, savory wet food packed with essential nutrients and hydration.",
      price: 350,
      rating: 4.8,
      image: "",
    },
    {
      id: 4,
      name: "Ocean Whitefish Pate",
      category: "Dog",
      description:
        "Smooth, savory wet food packed with essential nutrients and hydration.",
      price: 350,
      rating: 4.8,
      image: "",
    },
  ];

  const navigate = useNavigate();

  const filteredFoods =
    selectedCategory === "All Foods"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

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

        <div className="food-grid">
          {filteredFoods.map((food) => (
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
                  <img src={food.image} alt={food.name} />
                ) : (
                  <div className="image-placeholder"></div>
                )}
              </div>

              <div className="food-content">
                <h3>{food.name}</h3>

                <p className="food-description">{food.description}</p>

                <div className="food-rating">
                  <FaStar />
                  <span>{food.rating}</span>
                </div>

                <div className="food-bottom">
                  <span className="food-price">NPR {food.price}</span>

                  <button
                    className="cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <FaCartShopping />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Food;
