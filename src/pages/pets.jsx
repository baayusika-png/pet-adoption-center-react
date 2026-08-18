import PetCard from "../components/petCard";
import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import { getPets } from "../services/petsService";
import { getCategories } from "../services/categoryService";

function Pets() {
  const [pets, setPets] = useState([]);
  const [petCategories, setPetCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [breed, setBreed] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPets()
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching pets:", error);
        setLoading(false);
      });

    getCategories()
      .then((data) => {
        setPetCategories(data);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  }, []);

  const filteredPets = pets.filter((pet) => {
    const matchSearch = pet.breed.toLowerCase().includes(search.toLowerCase());

    const matchCategory = breed === "" || pet.category.name === breed;

    return matchSearch && matchCategory;
  });

  return (
    <>
      <section className="pets-page">
        <div className="pets-hero">
          <h1>Find Your Perfect Companion</h1>

          <p>
            Browse through our beautiful residents waiting for their forever
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
            <option value="">All Categories</option>

            {petCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="loading-text">Loading pets...</p>}

        {!loading && (
          <div className="animal-grid">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onAdopt={setSelectedPet} />
            ))}
          </div>
        )}

        {!loading && filteredPets.length === 0 && (
          <p className="no-pets">No pets found.</p>
        )}
      </section>

      {selectedPet && (
        <Popup pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </>
  );
}

export default Pets;
