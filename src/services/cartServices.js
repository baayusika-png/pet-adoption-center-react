const ADD_TO_CART = import.meta.env.VITE_ADD_TO_CART;
const GET_CART = import.meta.env.VITE_GET_CART;
const DELETE_CART = import.meta.env.VITE_DELETE_CART;
const CLEAR_CART = import.meta.env.VITE_CLEAR_CART;
const CITY = import.meta.env.VITE_CITY;
const ADDRESS_ADD = import.meta.env.VITE_ADD_ADDRESS;
const ADDRESS_EDIT = import.meta.env.VITE_EDIT_ADDRESS;
const ADDRESS_DELETE = import.meta.env.VITE_DELETE_ADDRESS;

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

export async function getSavedAddresses(token) {
  const response = await fetch(CITY, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to fetch delivery addresses");
  }

  return result;
}

export async function addAddress(addressData, token) {
  const formData = new FormData();

  formData.append("full_name", addressData.full_name);
  formData.append("phone", addressData.phone);
  formData.append("address", addressData.address);
  formData.append("city", addressData.city);
  formData.append("state", addressData.state);
  formData.append("postal_code", addressData.postal_code);
  formData.append("is_default", addressData.is_default ? "1" : "0");

  const response = await fetch(ADDRESS_ADD, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to add delivery address");
  }

  return result;
}

export async function editAddress(id, addressData, token) {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("full_name", addressData.full_name);
  formData.append("phone", addressData.phone);
  formData.append("address", addressData.address);
  formData.append("city", addressData.city);
  formData.append("state", addressData.state);
  formData.append("postal_code", addressData.postal_code);
  formData.append("is_default", addressData.is_default ? "1" : "0");

  const response = await fetch(ADDRESS_EDIT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to update address");
  }

  return result;
}

export async function deleteAddress(id, token) {
  const url = `${ADDRESS_DELETE}?id=${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to delete address");
  }

  return result;
}
