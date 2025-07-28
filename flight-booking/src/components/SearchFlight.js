

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flightNames from '../data/flightName';

function SearchFlight() {
  const [apiData, setApiData] = useState([]);
  const [deptID, setDeptID] = useState("");
  const [arrivalID, setArrivalID] = useState("");
  const [deptDate, setDeptDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fclass, setFclass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const username = localStorage.getItem('username');
      setIsLoggedIn(!!username);
    };
    
    checkAuthStatus();
    const interval = setInterval(checkAuthStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleForm(event) {
    event.preventDefault();

    const flightDetails = {
      deptID,
      arrivalID,
      deptDate,
      returnDate,
      fclass,
    };

    setIsLoading(true);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/search`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightDetails),
    })
      .then(response => response.json())
      .then(data => {
        setApiData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  const handleBookNow = (flight) => {
    if (isLoggedIn) {
      localStorage.setItem('selectedFlight', JSON.stringify(flight));
      navigate('/payment');
    } else {
      localStorage.setItem('flightAfterLogin', JSON.stringify(flight));
      navigate('/login');
      alert('Please login to complete your booking');
    }
  };


  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5;

  // Calculate pagination
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = apiData.slice(indexOfFirstFlight, indexOfLastFlight);
  const totalPages = Math.ceil(apiData.length / flightsPerPage);

  // Change page
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Reset to page 1 when new search results come in
  useEffect(() => {
    setCurrentPage(1);
  }, [apiData]);

  return (
    <div className="bg-gray-200 text-textDark pt-10 min-h-screen">
      {/* Flight Search Form */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Search Flights</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
      </div>
      <div className="flightForm container mx-auto px-4 py-8">
        <form onSubmit={handleForm} className="bg-white drop-shadow-xl rounded-lg p-10 py-12">
          <div className="flex flex-wrap space-x-4 items-center">
            {/* Form fields remain the same */}
            {/* Departure Airport */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">From</label>
              <select 
                id="deptID" 
                onChange={e => setDeptID(e.target.value)} 
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Departure Airport</option>
                {flightNames.map((flightName) => (
                  <option value={flightName.code} key={flightName.code}>
                    {flightName.name} - {flightName.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Arrival Airport */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">To</label>
              <select 
                id="arrivalID" 
                onChange={e => setArrivalID(e.target.value)} 
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Arrival Airport</option>
                {flightNames.map((flightName) => (
                  <option value={flightName.code} key={flightName.code}>
                    {flightName.name} - {flightName.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">Departure</label>
              <input 
                type="date" 
                id="deptDate" 
                name="deptDate" 
                onChange={e => setDeptDate(e.target.value)} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>

            {/* Return Date */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">Return</label>
              <input 
                type="date" 
                id="returnDate" 
                name="returnDate" 
                onChange={e => setReturnDate(e.target.value)} 
                className="w-full p-2 border rounded" 
              />
            </div>

            {/* Class Selection */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">Class</label>
              <select 
                id="fclass" 
                name="fclass" 
                onChange={e => setFclass(e.target.value)} 
                className="w-full p-2 border rounded"
                required
              >
                <option value="1">Economy</option>
                <option value="2">Premium Economy</option>
                <option value="3">Business</option>
                <option value="4">First</option>
              </select>
            </div>

            {/* Search Button */}
            <button 
              type="submit" 
              id="search" 
              className="mt-4 bg-primary text-white py-2 px-6 rounded-lg hover:bg-accent transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {/* Flight Results */}
      <div className="flightDisplay container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-primary">Loading flights...</p>
          </div>
        ) : currentFlights.length > 0 ? (
          <div>
            {currentFlights.map((item, index) => (
              <div 
                key={index} 
                className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center md:space-x-32 space-y-4 md:space-y-0"
              >
                {/* Flight details remain the same */}
                <div className="flex items-center space-x-4">
                  <img src={item.flights[0].airline_logo} alt="Airline Logo" className="w-12 h-12" />
                  <h2 className="text-lg font-bold text-center md:text-left">{item.flights[0].airline}</h2>
                </div>

                <div className="flex-1 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-medium">{item.flights[0].departure_airport.id}</h3>
                    <p className="text-sm">{item.flights[0].departure_airport.time}</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-medium">{item.total_duration}</span>
                  </div>

                  <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-medium">{item.flights[0].arrival_airport.id}</h3>
                    <p className="text-sm">{item.flights[0].arrival_airport.time}</p>
                  </div>
                </div>

                {/* Updated Book Now button with click handler */}
                <div className="text-center md:text-right">
                  <h1 className="text-xl font-bold text-accent">₹{item.price}</h1>
                  <button
                    onClick={() => handleBookNow(item)}
                    className="bg-orange-600 text-textLight py-2 px-6 rounded-full hover:bg-orange-700 transition duration-300 mt-4"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 
                  'bg-gray-200 text-gray-500 cursor-not-allowed' : 
                  'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Previous
              </button>

              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 
                  'bg-gray-200 text-gray-500 cursor-not-allowed' : 
                  'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Next
              </button>
            </div>
          </div>

        ) : (
          <p className="text-center text-base font-medium text-primary">
            {apiData.length === 0 && !isLoading ? 'No flights available for the selected criteria.' : ''}
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchFlight;