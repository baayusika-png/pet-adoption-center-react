import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaPaw, FaEye, FaEyeSlash } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import petImage from "../assets/images/Cat&Dog.png";
import { loginUser } from "../services/userService";

function Login() {
  // Controls whether the password is visible or hidden
  const [showPassword, setShowPassword] = useState(false);

  // Stores the email entered by the user
  const [email, setEmail] = useState("");

  // Stores the password entered by the user
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  async function handleLogin(e) {
    // Prevent page refresh when form is submitted
    e.preventDefault();

    // Check whether email or password is empty
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill all fields.");
      return;
    }

    try {
      // Create object containing login information
      const userData = {
        email: email,
        password: password,
      };

      // Send login data to the API
      const result = await loginUser(userData);

      // Display API response in console
      console.log("Login result:", result);

      // Check whether login was successful
      if (result.status === "success") {
        alert("Login successful!");

        // Navigate to Home page
        navigate("/");
      } else {
        // Display error message returned by API
        alert(result.message);
      }
    } catch (error) {
      // Handle API/network errors
      console.error("Login error:", error);
      alert("Login failed.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <h3>
            <FaPaw />
            AdoptMe
          </h3>

          <h1>Welcome Back</h1>

          <p>
            Your furry friend is waiting. Let's find your perfect companion
            today.
          </p>

          <div className="image-card">
            <img src={petImage} alt="Pets" />
          </div>
        </div>

        <div className="login-right">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>

              <div className="login-input-box">
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
              <div className="password-top">
                <label>Password</label>

                <span>Forgot password?</span>
              </div>

              <div className="login-input-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button className="login-btn" type="submit">
              Log In
            </button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <button type="button">
              <FcGoogle />
              Google
            </button>

            <button type="button">
              <FaFacebook color="#1877F2" />
              Facebook
            </button>
          </div>

          <p className="signup">
            Don't have an account?
            <span onClick={() => navigate("/register")}> Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
