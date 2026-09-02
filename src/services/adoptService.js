const API_URL = import.meta.env.VITE_ADOPTION_REQUEST_URL;

const ADOPTION_HISTORY = import.meta.env.VITE_ADOPTION_HISTORY;

//Submit new adoption request
export async function adoptionRequest(adoptionData) {
  const token = sessionStorage.getItem("token");

  //Use form data
  const formData = new FormData();

  formData.append("pet_id", adoptionData.pet_id);
  formData.append("reason", adoptionData.reason);
  formData.append("owned_pet_before", adoptionData.owned_pet_before);
  formData.append("currently_have_pets", adoptionData.currently_have_pets);
  formData.append("enough_space", adoptionData.enough_space);
  formData.append("information_confirmed", adoptionData.information_confirmed);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  console.log("Adoption response:", result);

  return result;
}

//Fetch adoption history/request for user
export async function getAdoptionHistory() {
  const token = sessionStorage.getItem("token");

  //No token means user is not logged in
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(ADOPTION_HISTORY, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failde to fetch adoption history");
  }

  const result = await response.json();
  return result;
}
