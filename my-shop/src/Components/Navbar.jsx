import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUser, removeUser } from "../storage";

const SunIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [user, setUser] = useState(getUser());
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setUser(getUser());
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    removeUser();
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 w-full lg:w-[90%] h-16 lg:h-20 lg:top-9 px-5 lg:px-10 mx-auto bg-black/50 backdrop-blur-[6px] lg:rounded-3xl">
      <nav className="flex justify-between items-center h-full">
        <Link
          to="/"
          className="text-xl lg:text-2xl font-bold text-orange-300 no-underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 lg:w-10 lg:h-10 text-orange-300"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 3h9a4 4 0 0 1 4 4v13a1 1 0 0 1-1.4.9c-.8-.3-1.7-.5-2.6-.5H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h9c1 0 2 .2 3 .6V7a2 2 0 0 0-2-2H6zm2 4h5a1 1 0 1 1 0 2H8a1 1 0 0 1 0-2zm0 4h3a1 1 0 1 1 0 2H8a1 1 0 0 1 0-2z" />
          </svg>
          Book Store
        </Link>

        {/* mobile btn*/}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleDarkMode}
            className="bg-transparent border-0 cursor-pointer p-2 text-orange-200"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-transparent border-0 cursor-pointer p-2 text-orange-200 text-xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* desktop */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link to="/cart" className="no-underline text-orange-200">
            Cart
          </Link>
          {user ? (
            <>
              <Link to="/admin" className="text-orange-200 no-underline">
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="bg-transparent border border-orange-200 text-orange-200 cursor-pointer px-3 py-1 rounded-md"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-orange-200 no-underline">
              Login
            </Link>
          )}
          <button
            onClick={toggleDarkMode}
            className="bg-transparent border-0 cursor-pointer p-2 text-orange-200"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      {/* mobile menu*/}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-800 p-4 flex flex-col gap-4 z-50 lg:hidden rounded-b-2xl">
          <Link to="/cart" className="text-orange-200 no-underline">
            Cart
          </Link>
          {user ? (
            <>
              <Link to="/admin" className="text-orange-200 no-underline">
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="bg-transparent border border-orange-200 text-orange-200 px-3 py-2 rounded-md cursor-pointer w-fit"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-orange-200 no-underline">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
