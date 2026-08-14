function AdoptionCard({ pet }) {
  return (
    <div className="adoption-card">
      <img src={pet.image} alt={pet.name} />

      <div className="adoption-info">
        <h3>{pet.name}</h3>

        <p>
          {pet.breed} • {pet.age} • {pet.gender}
        </p>

        <span>{pet.status}</span>
      </div>
    </div>
  );
}

export default AdoptionCard;