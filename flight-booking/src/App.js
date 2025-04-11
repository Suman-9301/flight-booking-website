

import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPages";
import MyBooking from "./components/MyBooking";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Nav";
import SearchFlight from "./components/SearchFlight";
import AboutUs from "./components/AboutUs";
import Support from "./components/Support";
import Footer from "./components/Footer";
import './App.css';
import MyProfile from './components/MyProfile';
import Payment from './components/Payment';

const AppWrapper = () => {
  const location = useLocation();
  const searchRef = useRef(null);
  const aboutRef = useRef(null);
  const supportRef = useRef(null);


  const scrollToSearch = () => searchRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToAbout = () => aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToSupport = () => supportRef.current?.scrollIntoView({ behavior: "smooth" });

  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <div className="min-h-screen bg-landing text-textDark flex flex-col">
      <Navbar
        scrollToSearch={isHomePage ? scrollToSearch : undefined}
        scrollToAbout={isHomePage ? scrollToAbout : undefined}
        scrollToSupport={isHomePage ? scrollToSupport : undefined}
      />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                searchRef={searchRef}
                aboutRef={aboutRef}
                supportRef={supportRef}
              />
            }
          />
          <Route
            path="/home"
            element={
              <LandingPage
                searchRef={searchRef}
                aboutRef={aboutRef}
                supportRef={supportRef}
              />
            }
          />
          <Route path="/search-flights" element={<SearchFlight />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/my-booking" element={<div className="container mx-auto px-4 py-8"><MyBooking /></div>} />
          <Route path="/login" element={<div className="container mx-auto px-4 py-8"><Login /></div>} />
          <Route path="/register" element={<div className="container mx-auto px-4 py-8"><Register /></div>} />
          <Route path="/my-profile" element={<div className="container mx-auto px-4 py-8"><MyProfile /></div>} />
          <Route path="/payment" element={<Payment />} /> 
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
