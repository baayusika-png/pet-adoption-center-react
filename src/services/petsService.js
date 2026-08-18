const API_URL =
  "http://localhost/pet-adoption-center/api/pets.php";

export async function getPets() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }

  const result = await response.json();

  return result.data;
}