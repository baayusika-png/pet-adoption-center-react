import PetCard from "../components/petCard";
import { useWishlist } from "../context/wishlistContext";
import { FaArrowLeft } from "react-icons/fa";

function Wishlist() {
  const { wishlist, loading } = useWishlist();

  return (
    <section className="pets-page">
      <button className="back-btn" onClick={() => window.history.back()}>
        <FaArrowLeft />
      </button>

      <div className="pets-hero">
        <h1>Your Wishlist</h1>
        <p>Pets you've saved for later.</p>
      </div>

      {loading ? (
        <p className="no-pets">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="no-pets">Your wishlist is empty.</p>
      ) : (
        <div className="animal-grid">
          {wishlist.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
