import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import Navbar from "./Components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    if (!saved) document.documentElement.classList.remove("dark");
    if (saved) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
