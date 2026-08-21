const API_URL = "http://localhost/pet-adoption-center/api/pets.php";

//Function to fetct pet data from the APi
export async function getPets() {
  //Send GET request to the API
  const response = await fetch(API_URL);

  //Check if the request was succesful
  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }

  //Convert the API response into JSON
  const result = await response.json();

  return result.data;
}

//Function to fetct pet data by id from the APi
export async function getPetById(id) {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch pet");
  }

  const result = await response.json();

  const pet = result.data.find((pet) => pet.id === parseInt(id));

  if (!pet) {
    throw new Error("Pet not found");
  }

  return pet;
}
