import heroImage from "../assets/images/happy_dogs.png";
import dog1 from "../assets/images/pets/dog1.webp";
import dog2 from "../assets/images/pets/dog2.jpg";
import dog3 from "../assets/images/pets/dog3.jpg";
import cat1 from "../assets/images/pets/cat.jpg";

function Home() {
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
              ifelong companionship and countless jouyful moments. When you
              choose adoption, you're not giving an animal home you're giving
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
            Explore More Pets <i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>

        <div className="pets-grid">
          <div className="pet-card">
            <img src={dog1} className="pet-image" />
            <div className="pet-breed">Luna</div>
          </div>

          <div className="pet-card">
            <img src={cat1} className="pet-image" />
            <div className="pet-breed">Whisker</div>
          </div>

          <div className="pet-card">
            <img src={dog2} className="pet-image" />
            <div className="pet-breed">Milo</div>
          </div>

          <div className="pet-card">
            <img src={dog3} className="pet-image" />
            <div className="pet-breed">Neko</div>
          </div>
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
              <i class="bx bx-heart"></i>
            </div>
            <h3>Save Lives</h3>
            <p>
              Adoption rescuses animals from shelters an gives them a second
              life.
            </p>
          </div>

          <div className="adopt-card">
            <div className="icon green">
              <i class="bx bx-happy"></i>
            </div>
            <h3>Companionship & Joy</h3>
            <p>Adopted pets bring unconditional love, loyalty and happiness.</p>
          </div>

          <div className="adopt-card">
            <div className="icon orange">
              <i class="bx bxs-home-heart"></i>
            </div>
            <h3>Support Shelter</h3>
            <p>
              Helps reduce overcrowding and supports animal welfare
              organizations.
            </p>
          </div>

          <div className="adopt-card">
            <div className="icon green">
              <i class="bx bx-band-aid"></i>
            </div>
            <h3>Health & Preparedness</h3>
            <p>
              Most adopted pets are vaccinated, spayed/neuttered, and health
              checked.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
