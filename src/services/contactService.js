const API_URL = "http://localhost/pet-adoption-center/api/adopt_center.php";

// Function to fetch adoption center data from the API
export async function getAdoptionCenter() {
  // Send GET request to the API
  const response = await fetch(API_URL);

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  // Convert the API response into JSON
  const result = await response.json();

  // Return the first adoption center from the data array
  return result.data[0];
}
