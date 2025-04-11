// import React from "react";

// function MyBooking() {

//   return (
//     <div className="container mx-auto px-4 py-8">
//     <h1 className="text-3xl font-bold mb-6 text-center md:text-left">My Bookings</h1>
//   </div>

//   );
// }

// export default MyBooking;


import React, { useState, useEffect } from 'react';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setBookings(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setBookings(bookings.map(booking => 
          booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        ));
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading your bookings...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-8">My Bookings</h1> */}
      
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">You have no bookings yet.</p>
          <button 
            onClick={() => window.location.href = '/search-flights'}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Book a Flight
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {booking.flight.flights[0].airline} Flight
                  </h2>
                  <p className="text-gray-600">
                    {booking.flight.flights[0].departure_airport.id} → {booking.flight.flights[0].arrival_airport.id}
                  </p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Flight Details</h3>
                  <div className="space-y-1">
                    <p><span className="text-gray-600">Departure:</span> {new Date(booking.flight.flights[0].departure_airport.time).toLocaleString()}</p>
                    <p><span className="text-gray-600">Duration:</span> {booking.flight.total_duration}</p>
                    <p><span className="text-gray-600">Class:</span> {booking.flight.flights[0].travel_class}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Passenger(s)</h3>
                  <ul className="space-y-1">
                    {booking.passengers.map((passenger, index) => (
                      <li key={index}>
                        {passenger.name} (Age: {passenger.age}, Seat: {passenger.seat})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>
                  <p className="text-sm text-gray-500">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold">₹{booking.totalAmount}</p>
                  
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;