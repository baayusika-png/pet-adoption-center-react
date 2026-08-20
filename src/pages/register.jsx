import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowRight, FaPaw } from "react-icons/fa";

import { registerUser } from "../services/userService";
import petImage from "../assets/images/registerImage.jpg";

function Register() {
  const navigate = useNavigate();

  //Stores form input values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  async function handleSubmit(e) {
    //Prevent page from refreshing when form is submitted
    e.preventDefault();

    //Checks if any required field is empty
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    //Create FormData to send data to the API
    const userData = new FormData();

    //Add form values to FormData
    userData.append("name", fullName);
    userData.append("phone", phone);
    userData.append("email", email);

    //Send adoption center ID
    userData.append("adoption_center_id", "1");

    userData.append("password", password);
    userData.append("confirm_password", confirmPassword);

    try {
      const result = await registerUser(userData); //Send registration data to the API

      console.log("Register result:", result);

      //Check whether registration was sucessful
      if (result.status === "success") {
        alert("Account created successfully!");
        navigate("/login"); //Navigate to login page after sucessful registration
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed.");
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-left">
          <img src={petImage} alt="pets" />
        </div>

        <div className="register-right">
          <h2 className="register-logo">
            <FaPaw />
            AdoptMe
          </h2>

          <h2>Create an Account</h2>

          <p>Join our community and find your new best friend.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-box">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-box">
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <div className="input-box">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-box">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <div className="input-box">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="terms">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />

              <span>
                I agree to the{" "}
                <span
                  onClick={() => navigate("/termsCondition")}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "#98520b",
                  }}
                >
                  Terms and Conditions.
                </span>
              </span>
            </div>

            <button className="register-btn" type="submit">
              SIGN UP
              <FaArrowRight />
            </button>
          </form>

          <p className="login-link">
            Already have an account?
            <span onClick={() => navigate("/login")}> Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
