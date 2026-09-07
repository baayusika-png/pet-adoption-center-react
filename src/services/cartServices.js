const ADD_TO_CART = import.meta.env.VITE_ADD_TO_CART;
const GET_CART = import.meta.env.VITE_GET_CART;
const DELETE_CART = import.meta.env.VITE_DELETE_CART;
const CLEAR_CART = import.meta.env.VITE_CLEAR_CART;

export async function addToCart(foodId, quantity, token) {
  const formData = new FormData();

  formData.append("food_id", String(foodId));
  formData.append("quantity", String(quantity));

  const response = await fetch(ADD_TO_CART, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to add food to cart");
  }

  return result;
}

export const getCart = async (token) => {
  const response = await fetch(GET_CART, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok || result.status === "error") {
    throw new Error(result.message || "Unable to fetch cart");
  }

  return result;
};

export const deleteCartItem = async (cartItemId, token) => {
  const url = `${DELETE_CART}?id=${cartItemId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok || result.status === "error") {
    throw new Error(result.message || "Unable to delete cart item");
  }

  return result;
};

export const clearCartItems = async (token) => {
  const response = await fetch(CLEAR_CART, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok || result.status === "error") {
    throw new Error(result.message || "Unable to clear cart");
  }

  return result;
};
