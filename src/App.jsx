import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Pets from "./pages/pets";
import Adopt from "./pages/adopt";
import Contact from "./pages/contact";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
