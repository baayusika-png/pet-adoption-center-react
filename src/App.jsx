import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Home from "./pages/home";
import Pets from "./pages/pets";
import Adopt from "./pages/adopt";
import Contact from "./pages/contact";
import Footer from "./components/footer";
import Login from "./pages/login";
import Register from "./pages/register";
import TrackApplication from "./pages/trackApplication";
import Profile from "./pages/profile";
import Terms from "./pages/termsCondition";
import Wishlist from "./pages/wishlist";
import PetDetail from "./pages/petDetail";
import PetFood from "./pages/petFood";
import ChangePassword from "./pages/changePassword";
import EditProfile from "./pages/editProfile";
import ForgetPassword from "./pages/forgetPassword";
import PetFoodDetail from "./pages/petFoodDetail";
import AdoptionHistory from "./pages/adoptionHistory";

function App() {
  const location = useLocation(); //Get current route path
  const hideLayout = ["/forgetPassword"].includes(location.pathname); //Pages where component should be hidden
  return (
    <>
      {!hideLayout && <Navbar />}
      {/*Shows Navbar on all pages except the ones in hideLayout */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trackApplication" element={<TrackApplication />} />
        <Route path="/termsCondition" element={<Terms />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/petFood" element={<PetFood />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/food/:id" element={<PetFoodDetail />} />
        <Route path="/adoptionHistory" element={<AdoptionHistory />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
      {!hideLayout && <Footer />}
      {/*Shows Footer on all pages except the ones in hideLayout*/}
    </>
  );
}

export default App;
