import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/happy_dogs.png";

import {
  FaHeart,
  FaSmile,
  FaHome,
  FaBandAid,
  FaArrowRight,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

import { getCategories } from "../services/categoryService";

function Home() {
  //Stores the categories fetched from the API
  const [categories, setCategories] = useState([]);

  //Controls whether the left and right carousel are shown
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  //Gives access to the pets grid DOM element
  const petsGridRef = useRef(null);

  //Used to navigate to different pages
  const navigate = useNavigate();

  // To fetch categories when component loads
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data); //Stores the fetched categories in state
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Check whether left/right scrolling is possible
  function checkScroll() {
    //Check if the pet grid element exist
    if (petsGridRef.current) {
      //Get the current scroll information
      const { scrollLeft, scrollWidth, clientWidth } = petsGridRef.current;

      //Shows left arrow if the grid has already been scrolled
      setCanScrollLeft(scrollLeft > 0);

      //Shows right arrow if there is still more content in the right
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }

  // Check scroll after categories are loaded
  useEffect(() => {
    checkScroll();
  }, [categories]);

  //Converts mouse wheel scrolling into horizontalling scrolling
  function handleWheel(e) {
    if (petsGridRef.current) {
      //Move the grid horizontally based on mouse wheel movement
      petsGridRef.current.scrollLeft += e.deltaY;
      //Updated arrow visibility
      checkScroll();
    }
  }

  //Scrolls the pets grid to the right
  function scrollRight() {
    if (petsGridRef.current) {
      petsGridRef.current.scrollLeft += 350;
      checkScroll();
    }
  }

  //Scrolls the pets grid to the left
  function scrollLeft() {
    if (petsGridRef.current) {
      petsGridRef.current.scrollLeft -= 350;
      checkScroll();
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Find Your New Best Friend <span>Today!</span>
            </h1>

            <p>
              Adopting a pet means opening your heart to unconditional love,
              lifelong companionship and countless joyful moments. When you
              choose adoption, you're not giving an animal home, you're giving
              them a family, a future and a chance to thrive.
            </p>

            <div className="hero-buttons">
              <a href="/adopt" className="btn btn-primary">
                Adopt Now
              </a>

              <a href="/pets" className="btn btn-secondary">
                View Pets
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImage} alt="Happy Dogs" />
          </div>
        </div>
      </section>

      <section className="pets-section">
        <div className="pets-header">
          <div>
            <h2>Meet Our Furry Friends</h2>
            <p className="subtitle">Adopt a pet, change a life</p>
          </div>

          <a href="/pets" className="explore-pets">
            Explore More Pets
            <FaArrowRight />
          </a>
        </div>

        <div className="pets-carousel">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              className="carousel-arrow carousel-left"
              onClick={scrollLeft}
            >
              <FaChevronLeft />
            </button>
          )}

          <div
            className="pets-grid"
            ref={petsGridRef}
            onWheel={handleWheel}
            onScroll={checkScroll}
          >
            {categories.map((category) => (
              <div
                className="pet-card"
                key={category.id}
                onClick={() => navigate("/pets")}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="pet-image"
                />

                <div className="pet-type">{category.name}</div>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              className="carousel-arrow carousel-right"
              onClick={scrollRight}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </section>

      <section className="adopt">
        <div className="adopt-header">
          <h2>Why Adopt?</h2>

          <p>
            Adopting a pet saves a life and fills your home with unconditional
            love.
          </p>

          <p>
            Every adoption is a chance to create a happier future - for them and
            for you.
          </p>
        </div>

        <div className="adopt-container">
          <div className="adopt-card">
            <div className="icon orange">
              <FaHeart />
            </div>

            <h3>Save Lives</h3>

            <p>
              Adoption rescues animals from shelters and gives them a second
              life.
            </p>
          </div>

          <div className="adopt-card">
            <div className="icon green">
              <FaSmile />
            </div>

            <h3>Companionship & Joy</h3>

            <p>Adopted pets bring unconditional love, loyalty and happiness.</p>
          </div>

          <div className="adopt-card">
            <div className="icon orange">
              <FaHome />
            </div>

            <h3>Support Shelter</h3>

            <p>
              Helps reduce overcrowding and supports animal welfare
              organizations.
            </p>
          </div>

          <div className="adopt-card">
            <div className="icon green">
              <FaBandAid />
            </div>

            <h3>Health & Preparedness</h3>

            <p>
              Most adopted pets are vaccinated, spayed/neutered, and health
              checked.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
