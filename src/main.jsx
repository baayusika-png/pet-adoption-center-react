import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// CSS
import "./css/style.css";
import "./css/navbar.css";
import "./css/footer.css";
import "./css/hero.css";
import "./css/cards.css";
import "./css/animation.css";
import "./css/responsive.css";
import "./css/form.css";
import "./css/login.css";
import "./css/register.css";
import "./css/history.css";
import "./css/terms.css";
import "./css/profile.css";
import "./css/wishlist.css"
import { AuthProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
