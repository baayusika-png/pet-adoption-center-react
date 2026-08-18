const BASE_URL =
  "http://localhost/pet-adoption-center/api/categories.php";

export async function getCategories() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await response.json();

  return result.data;
}