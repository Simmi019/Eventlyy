import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  // Listen for scroll events to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`w-full flex items-center justify-between px-5 py-4 z-50 fixed top-0 left-0 right-0 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span className={`text-xl font-semibold ${scrolled ? "text-gray-900" : "text-white"}`}>
            Evently
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center ml-8 gap-8">
          <Link 
            to="/" 
            className={`hover:text-purple-600 cursor-pointer ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/events" 
            className={`hover:text-purple-600 cursor-pointer ${
              scrolled ? "text-gray-500" : "text-white opacity-80"
            }`}
          >
            Events
          </Link>
          <Link 
            to="/about" 
            className={`hover:text-purple-600 cursor-pointer ${
              scrolled ? "text-gray-500" : "text-white opacity-80"
            }`}
          >
            About
          </Link>
          <Link 
            to="/pricing" 
            className={`hover:text-purple-600 cursor-pointer ${
              scrolled ? "text-gray-500" : "text-white opacity-80"
            }`}
          >
            Pricing
          </Link>
        </div>
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className={scrolled ? "text-gray-700" : "text-white"}>
              Welcome, {user.displayName || user.email}
            </span>
            <button 
              onClick={logout}
              className={`font-medium cursor-pointer ${
                scrolled ? "text-purple-600 hover:text-purple-800" : "text-white hover:text-purple-200"
              }`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className={`font-medium hover:text-purple-600 cursor-pointer ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white font-medium py-2 px-5 rounded-lg hover:bg-purple-700 cursor-pointer"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;