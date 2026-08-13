import PetCard from "../components/petCard";
import { useState } from "react";
import Popup from "../components/Popup";
import petsData from "../data/pets";

function Pets() {
  const [search, setSearch] = useState("");
  const [breed, setBreed] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);

  const filteredPets = petsData.filter((pet) => {
    const matchSearch = pet.breed.toLowerCase().includes(search.toLowerCase());

    const matchBreed = breed === "" || pet.breed === breed;

    return matchBreed && matchSearch;
  });

  return (
    <>
      <section className="pets-page">
        <div className="pets-hero">
          <h1>Find Your Perfect Companion</h1>
          <p>
            Browse through our beauitful residents waiting for their forever
            homes.
          </p>
        </div>

        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by animal breed..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="breed-filter"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option value="">All Breed</option>
            <option value="White Rabbit">White Rabbit</option>
            <option value="British Shorthair">British Shorthair</option>
            <option value="Calico Tabby">Calico Tabby</option>
            <option value="Polish Rabbit">Polish Rabbit</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Pomeranian">Pomeranian</option>
            <option value="Brown Tabby">Brown Tabby</option>
            <option value="European Hamster">European Hamster</option>
            <option value="American Guinea Pig">American Guinea Pig</option>
          </select>
        </div>

        <div className="animal-grid">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onAdopt={setSelectedPet} />
          ))}
        </div>
      </section>

      {selectedPet && (
        <Popup pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </>
  );
}

export default Pets;
