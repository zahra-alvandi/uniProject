import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import Checkout from "./Pages/Checkout";

import Navbar from "./Components/Navbar";

function AppContent() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={
        darkMode
          ? "dark bg-stone-950 text-stone-100 min-h-screen"
          : "bg-stone-50 text-stone-900 min-h-screen"
      }
    >
      <Toaster position="top-center" />

      {<Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}

      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/register" element={<Register darkMode={darkMode} />} />
        <Route path="/cart" element={<Cart darkMode={darkMode} />} />
        <Route path="/checkout" element={<Checkout darkMode={darkMode} />} />
        <Route path="/admin" element={<Admin darkMode={darkMode} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
