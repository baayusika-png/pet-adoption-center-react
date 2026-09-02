const GET_WISHLIST = import.meta.env.VITE_GET_WISHLIST;
const ADD_WISHLIST = import.meta.env.VITE_ADD_WISHLIST;
const DELETE_WISHLIST = import.meta.env.VITE_DELETE_WISHLIST;

//Fetch all wishlist items of the logged-in user
export async function getWishlist(token) {
  //Sends GET request to the wishlist API
  const response = await fetch(GET_WISHLIST, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, //Sends token to authenticate the user
    },
  });

  //Conver API response from JSON into JS object
  const result = await response.json();

  //Check if HTTP request failed or API returned a error status
  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to fetch wishlist");
  }

  //Convert the API response into simpler formart that is easier for react component to use

  //result.data = an array conating wishlist items
  //.map() goes through each wishlist item and creates a new object

  //(result.data || []) mean if result.data exists use it or else if its missing use an empty array
  return (result.data || []).map((item) => ({
    wishlist_id: item.id, //Id of the wishlist record later used when deleting an item form wishlist

    //Pet information from pets object and put into new object
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

//Add specific pet to the logged in user's wishlist
export async function addToWishlist(petId, token) {
  const formData = new FormData(); //Creates a FormData to send pet ID to the API

  //Add pet ID to request body
  formData.append("pet_id", String(petId));

  const response = await fetch(ADD_WISHLIST, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,  //Authticates user using token
    },
    body: formData, //Send pet ID as FormData
  });

  const result = await response.json(); //Converts API response into JS object

  //Check if request failed
  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to add pet to wishlist");
  }

  //Return the complete API response
  return result;
}

//Remove a wishlist item using its wishlist ID 
export async function removeFromWishlist(wishlistId, token) {
  const url = new URL(DELETE_WISHLIST); //Creates URL object from the DELETE API URL

  //Add wishlist ID as query parameter
  url.searchParams.set("wishlist_id", wishlistId);

  //Send DELETE request to remove wishlist item
  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //Convert API response into JS object 
  const result = await response.json();

  //Check if request failed or API returned an error
  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to remove pet from wishlist");
  }

  //Return the complete API response
  return result;
}
