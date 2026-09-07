const FORGOT_PASSWORD_URL = import.meta.env.VITE_FORGET_PASSWORD;
const VERIFY_OTP_URL = import.meta.env.VITE_OTP;
const RESET_PASSWORD = import.meta.env.VITE_RESET_PASSWORD;

//Sends the user's email to request an OTP
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(FORGOT_PASSWORD_URL, {
      method: "POST",

      //Tell backend that JSON data is being sent
      headers: {
        "Content-Type": "application/json",
      },

      //Send email to backend
      body: JSON.stringify({
        email: email,
      }),
    });

    //Convert API response into JS object
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

//Verifies OTP entered by user
export const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch(VERIFY_OTP_URL, {
      method: "POST",

      //Tell backend that JSON data is being sent
      headers: {
        "Content-Type": "application/json",
      },

      //Send email, OTP and purpose to backend
      body: JSON.stringify({
        email: email,
        otp: otp,
        purpose: "forgot_password",
      }),
    });

    //Convert API response into JS object
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

//Update the user password after OTP verification
export const resetPassword = async (
  customerId,
  newPassword,
  confirmPassword,
) => {
  try {
    const response = await fetch(RESET_PASSWORD, {
      method: "PATCH",

      //Tell backend that JSON data is being sent
      headers: {
        "Content-Type": "application/json",
      },

      //Send customer ID and new password details
      body: JSON.stringify({
        customer_id: customerId,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    });

    //Converts API response into JS object
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};
