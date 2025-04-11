
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ scrollToSearch, scrollToAbout, scrollToSupport }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setIsUserDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername || null);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <nav className="bg-primary text-textLight drop-shadow-2xl z-40 relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Airplane Booking Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold ml-2">SkyBooker</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="hover:text-accent transition duration-300">Home</Link>

          {isHomePage ? (
            <>
              <button onClick={scrollToSearch} className="hover:text-accent transition duration-300">Search Flights</button>
              <button onClick={scrollToAbout} className="hover:text-accent transition duration-300">About Us</button>
              <button onClick={scrollToSupport} className="hover:text-accent transition duration-300">Support</button>
            </>
          ) : (
            <>
              <Link to="/search-flights" className="hover:text-accent transition duration-300">Search Flights</Link>
              <Link to="/about-us" className="hover:text-accent transition duration-300">About Us</Link>
              <Link to="/support" className="hover:text-accent transition duration-300">Support</Link>
            </>
          )}

          {username ? (
            <>
              <Link to="/my-booking" className="hover:text-accent transition duration-300">My Booking</Link>
              <div className="relative">
                <button onClick={toggleUserDropdown} className="flex items-center hover:text-accent transition duration-300">
                  <span className="text-orange-400 font-semibold text-xl px-3">
                    {`${username.charAt(0).toUpperCase()}${username.slice(1)}`}
                  </span>
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/my-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsUserDropdownOpen(false)}>My Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition duration-300">Book Now</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-primary pb-4`}>
        <Link to="/" className="block py-2 px-4 text-white hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Home</Link>

        {isHomePage ? (
          <>
            <button onClick={() => { scrollToSearch(); setIsMenuOpen(false); }} className="block py-2 px-4 text-white hover:bg-accent">Search Flights</button>
            <button onClick={() => { scrollToAbout(); setIsMenuOpen(false); }} className="block py-2 px-4 text-white hover:bg-accent">About Us</button>
            <button onClick={() => { scrollToSupport(); setIsMenuOpen(false); }} className="block py-2 px-4 text-white hover:bg-accent">Support</button>
          </>
        ) : (
          <>
            <Link to="/search-flights" className="block py-2 px-4 text-white hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Search Flights</Link>
            <Link to="/about-us" className="block py-2 px-4 text-white hover:bg-accent" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/support" className="block py-2 px-4 text-white hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Support</Link>
          </>
        )}

        {username ? (
          <>
            <Link to="/my-booking" className="block py-2 px-4 text-white hover:bg-accent" onClick={() => setIsMenuOpen(false)}>My Booking</Link>
            <Link to="/my-profile" className="block py-2 px-4 text-white hover:bg-accent" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
            <button onClick={handleLogout} className="block w-full text-left py-2 px-4 text-white hover:bg-accent">Logout</button>
            <span className="block py-2 px-4 text-white">Welcome, {username}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="block py-2 px-4 text-white hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/register" className="block py-2 px-4 text-white hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
