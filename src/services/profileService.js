const PROFILE_URL = import.meta.env.VITE_PROFILE;
const UPDATE_PROFILE = import.meta.env.VITE_UPDATE_PROFILE;

export async function getProfile() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("No token fornd");
  }

  const response = await fetch(PROFILE_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  const result = await response.json();
  return result;
}

export async function updateProfile(formData) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(UPDATE_PROFILE, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return await response.json();
}
