const BASE_URL = import.meta.env.VITE_CATEGORIES_URL;

// Function to fetch  categories data from the API
export async function getCategories() {
  // Send GET request to the API
  const response = await fetch(BASE_URL);

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  // Convert the API response into JSON
  const result = await response.json();

  return result.data;
}
