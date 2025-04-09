import React from "react";

function MyBooking({ bookedFlights }) {

  // Handle Confirm Booking
  const handleConfirmBooking = () => {
    alert("Flight Booked Successfully!")
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6 text-center md:text-left">My Bookings</h1>

    {/* Booked Flights List */}
    {bookedFlights.length > 0 ? (
      bookedFlights.map((flight, index) => (
        <div 
          key={index} 
          className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-4 flex flex-col md:flex-row items-start md:items-start space-y-4 md:space-y-0 md:space-x-6"
        >
          {/* Flight Info */}
          <div className="flex flex-col items-start md:items-start space-y-4 md:space-y-2">
            <h2 className="text-xl font-bold text-center md:text-left">{flight.flights[0].airline}</h2>
            <img
              src={flight.flights[0].airline_logo}
              alt={`${flight.flights[0].airline} Logo`}
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Flight Details */}
          <div className="flex-1 flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between items-start md:items-start">
            <p className="text-sm md:text-base">
              <strong>Departure:</strong> {flight.flights[0].departure_airport.id} at{" "}
              {flight.flights[0].departure_airport.time}
            </p>
            <p className="text-sm md:text-base">
              <strong>Arrival:</strong> {flight.flights[0].arrival_airport.id} at{" "}
              {flight.flights[0].arrival_airport.time}
            </p>
            <p className="text-sm md:text-base">
              <strong>Total Duration:</strong> {flight.total_duration}
            </p>
            <p className="text-sm md:text-base">
              <strong>Price:</strong> ₹{flight.price}
            </p>
          </div>

          {/* Confirm Booking Button */}
          <div className="text-center md:text-right">
            <button
              onClick={handleConfirmBooking}
              className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-xl">No bookings yet.</p>
    )}
  </div>

  );
}

export default MyBooking;
