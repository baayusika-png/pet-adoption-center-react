function PetCard({ pet }) {
  return (
    <div className="animal-card">
      <div className="animal-image">
        <img src={pet.image} alt={pet.name} className="animal-photo" />
        <span className="badge vaccinated">Vaccinated</span>
      </div>

      <div className="card-body">
        <div className="card-top">
          <span className="animal-name">{pet.name}</span>
          <span className="badge available">Available</span>
        </div>

        <p className="animal-details">
          {pet.breed} • {pet.age} • {pet.gender}
        </p>

        <button className="adopt-btn">
          <i className="bx bx-home"></i>
          Adopt Me
        </button>
      </div>
    </div>
  );
}

export default PetCard;
