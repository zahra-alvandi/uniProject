import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import Navbar from "./Components/Navbar";
import Checkout from "./Pages/Checkout";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <HashRouter>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#111827" : "#ffffff",
          color: darkMode ? "#f9fafb" : "#000000",
        }}
      >
        <Toaster position="top-center" />
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/register" element={<Register darkMode={darkMode} />} />
          <Route path="/cart" element={<Cart darkMode={darkMode} />} />
          <Route path="/admin" element={<Admin darkMode={darkMode} />} />
          <Route path="/checkout" element={<Checkout darkMode={darkMode} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
