const REGISTER_URL = import.meta.env.VITE_REGISTER_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
const LOGOUT_URL = import.meta.env.VITE_LOGOUT_URL;

export async function registerUser(userData) {
  // Sends the registration data to API
  const response = await fetch(REGISTER_URL, {
    // Use POST method to send data
    method: "POST",

    // Send the FormData received from register.jsx
    body: userData,
  });

  // Convert API response from JSON format to JS object
  const result = await response.json();

  console.log("Register response:", result);

  // Check whether the HTTP request was successful
  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  // Return the API response to register.jsx
  return result;
}

export async function loginUser(userData) {
  const formData = new FormData();

  // Add login information
  formData.append("email", userData.email);
  formData.append("password", userData.password);

  // Send login information to API
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    body: formData,
  });

  // Convert API response to JavaScript object
  const result = await response.json();

  console.log("Login response:", result);

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  // Save token in sessionStorage
  sessionStorage.setItem("token", result.token);

  // Return API response
  return result;
}

export async function logoutUser() {
  // Get token from sessionStorage
  const token = sessionStorage.getItem("token");

  // Send logout request to API
  const response = await fetch(LOGOUT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Convert API response to JavaScript object
  const result = await response.json();

  console.log("Logout response:", result);

  if (!response.ok) {
    throw new Error(result.message || "Logout failed");
  }

  return result;
}