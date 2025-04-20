
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { load } from '@cashfreepayments/cashfree-js';

const Payment = () => {
  const [cfInstance, setCfInstance] = useState(null);
  const [flight, setFlight] = useState(null);
  const [passengerInfo, setPassengerInfo] = useState({
    passengerName: '',
    gender: '',
    dob: '',
    nationality: '',
    mobile: '',
    email: '',
    seatPreference: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeSDK = async () => {
      const cf = await load({ mode: "sandbox" });
      setCfInstance(cf);
    };
    initializeSDK();
  }, []);

  useEffect(() => {
    const savedFlight = localStorage.getItem('selectedFlight');
    if (savedFlight) {
      setFlight(JSON.parse(savedFlight));
    } else if (location.state?.flight) {
      setFlight(location.state.flight);
    } else {
      navigate('/');
    }
  }, [navigate, location]);

  const handleFormChange = (e) => {
    setPassengerInfo({
      ...passengerInfo,
      [e.target.name]: e.target.value
    });
  };

  const getSessionId = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/pay`, {
        amount: flight.price
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data && res.data.payment_session_id) {
        return {
          sessionId: res.data.payment_session_id,
          orderId: res.data.order_id
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
        orderId,
        flight,
        totalAmount: flight.price,
        passengerInfo
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res && res.data) {
        alert("Payment Successful");
        navigate("/my-booking");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const isComplete = Object.values(passengerInfo).every(val => val.trim() !== '');
    if (!isComplete) {
      alert("Please fill all passenger details.");
      return;
    }

    try {
      const paymentData = await getSessionId();
      if (!paymentData) return;

      const { sessionId, orderId } = paymentData;

      if (!cfInstance) {
        alert("Payment SDK not initialized yet");
        return;
      }

      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cfInstance.checkout(checkoutOptions).then(() => {
        verifyPayment(orderId);
      });

    } catch (error) {
      console.log(error);
    }
  };

  if (!flight) return <div className="text-center py-8">Loading flight details...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>

 

<div className="bg-gray-100 shadow-xl outline outline-black/5 rounded-lg p-8  mb-8 border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Passenger Information</h2>
  <form className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Full Name */}
      <div>
        <label htmlFor="passengerName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="passengerName"
          name="passengerName"
          placeholder="John Doe"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          onChange={handleFormChange}
          required
        />
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender <span className="text-red-500">*</span>
        </label>
        <select
          id="gender"
          name="gender"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          onChange={handleFormChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          onChange={handleFormChange}
          required
        />
      </div>

      {/* Nationality */}
      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
          Nationality <span className="text-red-500">*</span>
        </label>
        <input
          id="nationality"
          name="nationality"
          placeholder="e.g. Indian"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          onChange={handleFormChange}
          required
        />
      </div>

      {/* Mobile Number */}
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          placeholder="+91 9876543210"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          onChange={handleFormChange}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          onChange={handleFormChange}
          required
        />
      </div>

      {/* Seat Preference */}
      <div>
        <label htmlFor="seatPreference" className="block text-sm font-medium text-gray-700 mb-1">
          Seat Preference <span className="text-red-500">*</span>
        </label>
        <select
          id="seatPreference"
          name="seatPreference"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          onChange={handleFormChange}
          required
        >
          <option value="">Select Preference</option>
          <option value="Window">Window</option>
          <option value="Aisle">Aisle</option>
          <option value="Middle">Middle</option>
        </select>
      </div>
    </div>
  </form>
</div>

      {/* Flight Summary */}
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Airline:</span> {flight.flights[0].airline}</p>
          <p><span className="font-medium">Route:</span> {flight.flights[0].departure_airport.id} → {flight.flights[0].arrival_airport.id}</p>
          <p><span className="font-medium">Departure:</span> {new Date(flight.flights[0].departure_airport.time).toLocaleString()}</p>
          <p><span className="font-medium">Duration:</span> {flight.total_duration}</p>
          <p><span className="font-medium">Class:</span> {flight.flights[0].travel_class}</p>
          <p className="text-xl font-bold mt-4">Total: ₹{flight.price}</p>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="w-full py-4 text-white text-xl bg-green-600 hover:bg-green-700 font-medium rounded-lg"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
