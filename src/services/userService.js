const REGISTER_URL = "http://localhost/pet-adoption-center/api/register.php";

const LOGIN_URL = "http://localhost/pet-adoption-center/api/login.php";

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
  const formData = new FormData(); //Create FormData to send login information

  //Add data to FormData
  formData.append("email", userData.email);
  formData.append("password", userData.password);

  //Send login information to the API
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    body: formData,
  });
  // Convert API response from JSON to JS object
  const result = await response.json();

  console.log("Login response:", result);

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  // Return the API response to login.jsx
  return result;
}
