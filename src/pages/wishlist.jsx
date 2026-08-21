import { FaArrowLeft, FaHeart, FaHome } from "react-icons/fa";

function Wishlist() {
  const wishlistPets = [
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      age: "3 Year",
      gender: "Male",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
      vaccinated: true,
      status: "Available",
    },
    {
      id: 2,
      name: "Milo",
      breed: "Labrador",
      age: "2 Year",
      gender: "Male",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
      vaccinated: true,
      status: "Available",
    },
    {
      id: 3,
      name: "Luna",
      breed: "German Shepherd",
      age: "3 Year",
      gender: "Female",
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95",
      vaccinated: true,
      status: "Available",
    },
  ];

  const handleAdopt = (pet) => {
    console.log("Adopting:", pet);
  };

  const removeFromWishlist = (pet) => {
    console.log("Remove from wishlist:", pet);
  };

  return (
    <div className="wishlist-page">
      {/* Back Button */}
      <button className="back-btn" onClick={() => window.history.back()}>
        <FaArrowLeft />
      </button>

      {/* Heading */}
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Pets you've saved to review later.</p>
      </div>

      {/* Wishlist Cards */}
      <div className="wishlist-grid">
        {wishlistPets.map((pet) => (
          <div className="wishlist-card" key={pet.id}>
            <div className="wishlist-image">
              <img src={pet.image} alt={pet.name} />

              {/* Vaccinated */}
              <span className="wishlist-vaccinated">
                {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
              </span>

              {/* Heart */}
              <button
                className="wishlist-heart"
                onClick={() => removeFromWishlist(pet)}
              >
                <FaHeart />
              </button>
            </div>

            <div className="wishlist-body">
              <div className="wishlist-card-top">
                <h3>{pet.name}</h3>

                <span className="wishlist-status">
                  {pet.status}
                </span>
              </div>

              <p className="wishlist-details">
                {pet.breed} • {pet.age} • {pet.gender}
              </p>

              <button
                className="wishlist-adopt-btn"
                onClick={() => handleAdopt(pet)}
              >
                <FaHome />
                Adopt Me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;