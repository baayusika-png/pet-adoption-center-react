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
