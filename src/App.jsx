import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

import Home from "./pages/home";
import Pets from "./pages/pets";
import Adopt from "./pages/adopt";
import Contact from "./pages/contact";
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
import VerifyOTP from "./pages/verifyOTP";
import ResetPassword from "./pages/resetPassword";
import ChatBot from "./components/chatBot";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Orders from "./pages/order";
import MyAddresses from "./pages/myAddress";
import OrderSucess from "./pages/orderSucess";

function App() {
  const location = useLocation(); //Get current route path
  const hideLayout = [
    "/forgetPassword",
    "/resetPassword",
    "/changePassword",
    "/editProfile",
  ].includes(location.pathname); //Pages where component should be hidden

  const hideChat = [
    "/login",
    "/register",
    "/termsCondition",
    "/profile",
    "/editProfile",
    "/forgetPassword",
    "/resetPassword",
    "/changePassword",
    "/wishlist",
    "/trackApplication",
    "/adoptionHistory",
    "/order",
  ].includes(location.pathname);

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
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/myAddresses" element={<MyAddresses />} />
        <Route path="/orderSucess" element={<OrderSucess />} />
      </Routes>

      {!hideChat && <ChatBot />}
      {!hideLayout && <Footer />}
      {/*Shows Footer on all pages except the ones in hideLayout*/}
    </>
  );
}

export default App;
