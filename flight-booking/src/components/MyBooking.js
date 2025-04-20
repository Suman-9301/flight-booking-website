

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiClock, FiCalendar, FiX, FiDollarSign, FiDownload } from "react-icons/fi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDownload = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/download/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        alert("Failed to generate ticket.");
        return;
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `SkyBooker_Ticket_${bookingId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("An error occurred while downloading.");
    }
  };

  const cancelBooking = async (paymentId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/cancel-booking/by-payment/${paymentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setBookings((prev) =>
        prev.map((booking) =>
          booking.paymentId === paymentId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert(
        error.response?.data?.error || "Failed to cancel booking."
      );
    }
  };

  const isPastFlight = (departureTime) => {
    return new Date(departureTime) < new Date();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-gray-600 mt-1">
            {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'} found
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No bookings yet</h3>
            <p className="mt-2 text-gray-500">You haven't made any flight bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
                  booking.status === "cancelled" ? "border-red-200" : "border-gray-200"
                }`}
              >
                <div className="p-6 flex flex-col md:flex-row justify-between">
                  {/* Flight Information */}
                  <div className="flex-1">
                    <div className="flex items-start">
                      {/* Airline Logo */}
                      {booking.flight.airline_logo && (
                        <div className="mr-4 flex-shrink-0">
                          <img 
                            src={booking.flight.airline_logo} 
                            alt={booking.flight.airline} 
                            className="h-12 w-12 object-contain"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {booking.flight.airline} - {booking.flight.flight_number}
                            </h3>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <FiCalendar className="mr-1.5" />
                              <span>Booked on {formatDate(booking.bookingDate)}</span>
                            </div>
                          </div>
                          <span
                            className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">From</p>
                            <p className="text-lg font-semibold">{booking.flight.from}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">To</p>
                            <p className="text-lg font-semibold">{booking.flight.to}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Departure</p>
                            <p className="flex items-center">
                              <FiClock className="mr-1.5" />
                              <span>{formatTime(booking.flight.departure_time)}</span>
                            </p>
                            <p className="text-sm">{formatDate(booking.flight.departure_time)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment and Actions */}
                  <div className="mt-4 md:mt-0 md:ml-6 md:w-64 flex flex-col justify-between">
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center text-sm">
                        <FiDollarSign className="text-gray-500 mr-1.5" />
                        <span className="text-gray-500">Total:</span>
                        <span className="ml-1 font-semibold">
                          {booking.currency} {booking.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        Payment ID: {booking.paymentId}
                      </div>
                    </div>

                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => handleDownload(booking.bookingId)}
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiDownload className="mr-2" />
                        Download
                      </button>

                      <button
                        onClick={() => cancelBooking(booking.paymentId)}
                        disabled={booking.status === "cancelled" || isPastFlight(booking.flight.departure_time)}
                        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
                          booking.status === "cancelled"
                            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                            : isPastFlight(booking.flight.departure_time)
                            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        <FiX className="mr-2" />
                        {booking.status === "cancelled" 
                          ? "Cancelled" 
                          : isPastFlight(booking.flight.departure_time)
                          ? "Departed"
                          : "Cancel"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;