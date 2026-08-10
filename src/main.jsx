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

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
