import { useEffect, useRef, useState } from "react";
import heroImage from "../assets/images/happy_dogs.png";

import {
  FaHeart,
  FaSmile,
  FaHome,
  FaBandAid,
  FaChevronRight,
} from "react-icons/fa";

import { getCategories } from "../services/categoryService";

function Home() {
  const [categories, setCategories] = useState([]); //To store category data
  const petsGridRef = useRef(null); //To acess pet grid DOM element

  //To fetch categories when component loads
  useEffect(() => {
    getCategories()
      //stores fetched categories in the state
      .then((data) => {
        setCategories(data);
      })
      //shows error if the request fails
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleWheel(e) {
    //converts mouse wheel scrolling into horizontal scrolling
    if (petsGridRef.current) {
      petsGridRef.current.scrollLeft += e.deltaY; //scroll the pets grid horizontally
    }
  }

  function scrollRight() {
    //scroll the pets grid to right

    //check if the pets grid element exists
    if (petsGridRef.current) {
      //moves the grid 350 px to the right
      petsGridRef.current.scrollLeft += 350;
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
            <i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>

        <div className="pets-carousel">
          <div className="pets-grid" ref={petsGridRef} onWheel={handleWheel}>
            {categories.map((category) => (
              <div className="pet-card" key={category.id}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="pet-image"
                />

                <div className="pet-type">{category.name}</div>
              </div>
            ))}
          </div>

          <button className="carousel-arrow" onClick={scrollRight}>
            <FaChevronRight />
          </button>
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
