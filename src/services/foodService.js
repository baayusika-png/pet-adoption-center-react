const FOOD_URL = import.meta.env.VITE_FOOD;

//Function to fetct pet data from the API
export async function getAllFood() {
  //Send GET request to the API
  const response = await fetch(FOOD_URL);

  //Check if the request was succesful
  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }

  //Convert the API response into JSON
  const result = await response.json();

  return result.data;
}

export async function getFoodById(id) {
  const foods = await getAllFood();

  const food = foods.find((food) => food.id === parseInt(id));

  if (!food) {
    throw new Error("Food not found");
  }

  return food;
}
