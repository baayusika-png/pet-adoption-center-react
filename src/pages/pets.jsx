import PetCard from "../components/petCard"; 
import { useEffect, useState } from "react"; 
import { getPets } from "../services/petsService"; 
import { getCategories } from "../services/categoryService"; 
 
function Pets() { 
  const [pets, setPets] = useState([]); 
  const [petCategories, setPetCategories] = useState([]); //Stores list of pet categories used for filter dropdown 
  const [search, setSearch] = useState(""); //Stores search input value used to filter pets by breed 
  const [selectedPet, setSelectedPet] = useState(null); //Store currently selected pet 
  const [breed, setBreed] = useState(""); //Stores selected cateory/breed filter value 
  const [loading, setLoading] = useState(true); //Loading state while feteching pets 
 
  useEffect(() => { 
    getPets() //Fetch all pets from API 
      .then((data) => { 
        setPets(data); 
        setLoading(false); 
      }) 
      .catch((error) => { 
        setLoading(false); 
      }); 
 
    getCategories() //Fetch pet categories from API 
      .then((data) => { 
        setPetCategories(data); 
      }) 
      .catch((error) => { 
      }); 
  }, []); 
 
  //Filter pets based on search text (Breed) and selected category 
  const filteredPets = pets.filter((pet) => { 
    //Check if pet's breed matched the search input 
    const matchSearch = pet.breed.toLowerCase().includes(search.toLowerCase()); 
 
    //Check if pet's category matches selected filter 
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

