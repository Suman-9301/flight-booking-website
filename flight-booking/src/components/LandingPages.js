
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchFlight from "./SearchFlight";
import AboutUs from "./AboutUs";
import Support from "./Support";
import landingImage from "../assets/landing.jpg"; 

const LandingPage = ({ searchRef, aboutRef, supportRef }) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (window.location.pathname === '/') {
      searchRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/search-flights');
    }
  };

  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <img 
            src={landingImage} 
            alt="Airplane in sky" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center py-16 max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Welcome to <span className="text-orange-400 ">SkyBooker</span>
            </h1>
            <p className="text-xxl mb-8 text-gray-100">
              Your ultimate flight booking companion. Compare flights, find the best deals, 
              and book your next adventure with ease.
            </p>
            <p className="text-2xl font-semibold italic text-white mb-12">
              "Your Journey Starts Here – Book Your Sky, Book Your Dreams."
            </p>
            <button 
              onClick={handleSearchClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>

      <section ref={searchRef} className="scroll-mt-16"> 
        <SearchFlight />
      </section>

      <section ref={aboutRef} className="scroll-mt-16">
        <AboutUs />
      </section>

      <section ref={supportRef} className="scroll-mt-16">
        <Support />
      </section>
    </>
  );
};

export default LandingPage;