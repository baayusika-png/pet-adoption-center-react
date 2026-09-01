const GET_WISHLIST = import.meta.env.VITE_GET_WISHLIST;
const ADD_WISHLIST = import.meta.env.VITE_ADD_WISHLIST;
const DELETE_WISHLIST = import.meta.env.VITE_DELETE_WISHLIST;

// GET WISHLIST
export async function getWishlist(token) {
  const response = await fetch(GET_WISHLIST, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to fetch wishlist");
  }

  return (result.data || []).map((item) => ({
    wishlist_id: item.id,
    id: item.pets.pet_id,
    pet_name: item.pets.pet_name,
    breed: item.pets.breed,
    age: item.pets.age,
    gender: item.pets.gender,
    vaccinated: item.pets.vaccinated,
    description: item.pets.description,
    image: item.pets.image,
    status: item.pets.status,
    category: item.pets.category,
    created_at: item.pets.created_at,
    updated_at: item.pets.updated_at,
  }));
}

// ADD TO WISHLIST
export async function addToWishlist(petId, token) {
  const formData = new FormData();

  formData.append("pet_id", String(petId));

  const response = await fetch(ADD_WISHLIST, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to add pet to wishlist");
  }

  return result;
}

// REMOVE FROM WISHLIST
export async function removeFromWishlist(wishlistId, token) {
  const url = new URL(DELETE_WISHLIST);

  url.searchParams.set("wishlist_id", wishlistId);

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to remove pet from wishlist");
  }

  return result;
}
