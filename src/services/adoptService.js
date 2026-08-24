const API_URL = import.meta.env.VITE_ADOPTION_REQUEST_URL;

export async function adoptionRequest(adoptionData) {
  const token = localStorage.getItem("token");

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
