import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaw, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import petImage from "../assets/images/Cat&Dog.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
          <div className="form-group">
            <label>Email Address</label>

            <div className="login-input-box">
              <input type="email" placeholder="hello@example.com" />
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
              />
            </div>
          </div>

          <button className="login-btn">Log In</button>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <button>
              <FcGoogle />
              Google
            </button>

            <button>
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
