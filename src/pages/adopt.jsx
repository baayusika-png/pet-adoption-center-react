import { Link } from "react-router-dom";
import heroAdopt1 from "../assets/images/Cat&Dog.png";
import heroAdopt2 from "../assets/images/happyCat&Dog.png";

import AdoptForm from "../components/AdoptForm";

function Adopt() {
  return (
    <>
      <section className="adopt-hero">
        <h1>Give a Paw a Home</h1>

        <p>
          Thank you for choosing adoption and giving a pet a second chance.
          Fill out this form to begin your journey of adopting a loving
          companion.
        </p>
      </section>

      <div className="content">
        <div className="adoptImage">
          <img src={heroAdopt1} alt="Cat and Dog" />
          <img src={heroAdopt2} alt="Happy Cat and Dog" />

          <Link to="/history" className="history-btn">
            View Adoption History
          </Link>
        </div>

        <AdoptForm />
      </div>
    </>
  );
}

export default Adopt;