const REGISTER_URL = import.meta.env.VITE_REGISTER_URL;

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

export async function registerUser(userData) {
  //Sends the registration data to API
  const response = await fetch(REGISTER_URL, {
    //Use POST method to send data
    method: "POST",

    //Send the FormData received from register.jsx
    body: userData,
  });

  //Convert API response from JSON format to JS object
  const result = await response.json();

  console.log("Register response:", result);

  //Check whether the HTTP request was sucessful
  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  //Retrun the API response to register.jsx
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

  // Save token for authenticated requests
  localStorage.setItem("token", result.token);

  // Return API response
  return result;
}
