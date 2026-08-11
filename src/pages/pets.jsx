import PetCard from "../components/petCard";
import Popup from "../components/popup";
import petsData from "../data/pets";

function Pets() {
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
            placeholder="Search by animal type..."
            className="search-bar"
          />

          <select className="breed-filter">
            <option value="">All Breed</option>
            <option value="whiteRabbit">White Rabbit</option>
            <option value="britishShorthair">British Shorthair</option>
            <option value="calicoTabby">Calico Tabby</option>
            <option value="polishRabbit">Polish Rabbit</option>
            <option value="goldenRetriever">Golden Retriever</option>
            <option value="pomerian">Pomerian</option>
            <option value="brownTabby">Brown Tabby</option>
            <option value="europeanHamster">European Hamster</option>
            <option value="americanGuineaPig">American Guinea Pig</option>
          </select>
        </div>

        <div className="animal-grid">
          {petsData.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Pets;
