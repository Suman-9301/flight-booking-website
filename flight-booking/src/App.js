
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPages";
import MyBooking from "./components/MyBooking";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Nav"; 

import './App.css'; // Make sure to import the CSS file
import MyProfile from './components/MyProfile';

function App() {

  const [bookedFlights, setBookedFlights] = useState([]); // State for booked flights

  // Function to add a flight to bookings
  const addBooking = (flightDetails) => {
    setBookedFlights((prev) => [...prev, flightDetails]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-landing text-textDark">
        {/* Navbar */}
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage addBooking={addBooking}/>} />
            <Route path="/my-booking" element={<MyBooking bookedFlights={bookedFlights}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-profile" element={<MyProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
