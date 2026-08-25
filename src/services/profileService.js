const PROFILE_URL = import.meta.env.VITE_PROFILE;

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
