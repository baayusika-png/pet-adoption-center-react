import { StrictMode } from "react";
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
import "./css/trackApplication.css";
import "./css/terms.css";
import "./css/profile.css";
import "./css/petDetail.css";
import "./css/petFood.css";
import "./css/foodDetail.css";
import "./css/adoptionHistory.css";
import "./css/changePassword.css";
import "./css/editProfile.css";
import "./css/forgetPassword.css";
import { AuthProvider } from "./context/authContext.jsx";
import { WishlistProvider } from "./context/wishlistContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
