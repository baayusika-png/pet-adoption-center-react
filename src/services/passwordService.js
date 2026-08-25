const FORGOT_PASSWORD_URL = import.meta.env.VITE_FORGET_PASSWORD;

const VERIFY_OTP_URL = import.meta.env.VITE_OTP;

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(FORGOT_PASSWORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const result = await response.json();

    console.log("Forgot Password API Response:", result);

    return result;
  } catch (error) {
    console.error("Forgot Password API Error:", error);
    throw error;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch(VERIFY_OTP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
        purpose: "forgot_password",
      }),
    });

    const result = await response.json();

    console.log("Verify OTP Response:", result);

    return result;
  } catch (error) {
    console.error("Verify OTP API Error:", error);
    throw error;
  }
};
