
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setIsUserDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        setUsername(null);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, []); 

  return (
    <nav className="bg-primary text-textLight shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Airplane Booking Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold ml-2">SkyBooker</span>
        </Link>

        {/* Desktop Menu (Visible on larger screens) */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="hover:text-accent transition duration-300">Home</Link>
          <Link to="/search-flights" className="hover:text-accent transition duration-300">Search Flights</Link>
          
          {username ? (
            <>
              <Link to="/my-booking" className="hover:text-accent transition duration-300">My Booking</Link>
              <div className="relative">
                <button 
                  onClick={toggleUserDropdown}
                  className="flex items-center hover:text-accent transition duration-300"
                >
                  <span className="text-orange-400 font-semibold text-xl px-3">
                    {`${username.charAt(0).toUpperCase()}${username.slice(1)}`}
                  </span>
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isUserDropdownOpen ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>
                
                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link 
                      to="/my-profile" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/saved-flights" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Saved Flights
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/about-us" className="hover:text-accent transition duration-300">About Us</Link>
              <Link to="/support" className="hover:text-accent transition duration-300">Support</Link>
              <Link 
              to="/login" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Book Now
            </Link>
              {/* <Link to="/register" className="hover:text-accent transition duration-300">Register</Link> */}
            </>
          )}
        </div>

        {/* Hamburger Menu Icon for Mobile View */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible when isMenuOpen is true) */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-primary pb-4`}>
        <Link 
          to="/" 
          className="block py-2 px-4 text-white hover:bg-accent"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/search-flights" 
          className="block py-2 px-4 text-white hover:bg-accent"
          onClick={() => setIsMenuOpen(false)}
        >
          Search Flights
        </Link>
        
        {username ? (
          <>
            <Link 
              to="/my-booking" 
              className="block py-2 px-4 text-white hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              My Booking
            </Link>
            <Link 
              to="/my-profile" 
              className="block py-2 px-4 text-white hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              My Profile
            </Link>
            <Link 
              to="/saved-flights" 
              className="block py-2 px-4 text-white hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Saved Flights
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 px-4 text-white hover:bg-accent"
            >
              Logout
            </button>
            <span className="block py-2 px-4 text-white">
              Welcome, {username}
            </span>
          </>
        ) : (
          <>
            <Link 
              to="/about-us" 
              className="block py-2 px-4 text-white hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/support" 
              className="block py-2 px-4 text-white hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              to="/login" 
              className="block py-2 px-4 text-white hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="block py-2 px-4 text-white hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;