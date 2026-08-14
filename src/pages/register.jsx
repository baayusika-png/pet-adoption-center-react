import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

import petImage from "../assets/images/happyCat&Dog.png";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
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

    alert("Account created successfully!");

    navigate("/login");
  }

  return (
    <div className="register-page">
      <div className="register-card">
        {/* LEFT */}

        <div className="register-left">
          <img src={petImage} alt="pets" />
        </div>

        {/* RIGHT */}

        <div className="register-right">
          <h1>AdoptMe</h1>

          <h2>Create an Account</h2>

          <p>Join our community and find your new best friend.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-box">
                <input type="text" placeholder="Enter your full name" />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-box">
                <input type="email" placeholder="hello@example.com" />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-box">
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <div className="input-box">
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="terms">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />

              <span>
                I agree to the
                <b> Terms and Conditions </b>
                and
                <b> Privacy Policy.</b>
              </span>
            </div>

            <button className="register-btn">
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
