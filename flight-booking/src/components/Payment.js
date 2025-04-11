
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Payment = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [flight, setFlight] = useState(null);
//   const [passengerDetails, setPassengerDetails] = useState({
//     name: '',
//     age: '',
//     seat: '12A' // Default seat
//   });
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     const savedFlight = localStorage.getItem('selectedFlight');
//     if (savedFlight) {
//       setFlight(JSON.parse(savedFlight));
//     } else if (location.state?.flight) {
//       setFlight(location.state.flight);
//     } else {
//       navigate('/');
//     }
//   }, [navigate, location]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPassengerDetails(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePayment = async () => {
//     if (!passengerDetails.name || !passengerDetails.age) {
//       alert('Please fill all passenger details');
//       return;
//     }

//     setIsProcessing(true);
//     setPaymentStatus('processing');

//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // Randomly fail 10% of payments for testing
//       const isSuccess = Math.random() > 0.1;

//       if (isSuccess) {
//         const paymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
        
//         // Save booking to database
//         const response = await fetch('/api/bookings', {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           body: JSON.stringify({
//             flight,
//             paymentId,
//             passengers: [passengerDetails],
//             totalAmount: flight.price,
//             userId: localStorage.getItem('userId')
//           })
//         });

//         if (!response.ok) throw new Error('Failed to save booking');

//         setPaymentStatus('success');
//         localStorage.removeItem('selectedFlight');
        
//         // Redirect to confirmation after 1.5 seconds
//         setTimeout(() => {
//           navigate('/booking-confirmation', {
//             state: {
//               flight,
//               paymentId,
//               passenger: passengerDetails
//             }
//           });
//         }, 1500);
//       } else {
//         setPaymentStatus('failed');
//       }
//     } catch (err) {
//       console.error('Payment error:', err);
//       setPaymentStatus('error');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (!flight) return <div className="text-center py-8">Loading flight details...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-2xl">
//       <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
      
//       {/* Flight Summary */}
//       <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
//         <div className="space-y-2">
//           <p><span className="font-medium">Airline:</span> {flight.flights[0].airline}</p>
//           <p><span className="font-medium">Route:</span> {flight.flights[0].departure_airport.id} → {flight.flights[0].arrival_airport.id}</p>
//           <p><span className="font-medium">Departure:</span> {new Date(flight.flights[0].departure_airport.time).toLocaleString()}</p>
//           <p><span className="font-medium">Duration:</span> {flight.total_duration}</p>
//           <p><span className="font-medium">Class:</span> {flight.flights[0].travel_class}</p>
//           <p className="text-xl font-bold mt-4">Total: ₹{flight.price}</p>
//         </div>
//       </div>

//       {/* Passenger Details */}
//       <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={passengerDetails.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Age</label>
//             <input
//               type="number"
//               name="age"
//               value={passengerDetails.age}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//               min="1"
//               max="120"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Seat Preference</label>
//             <select
//               name="seat"
//               value={passengerDetails.seat}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="12A">12A (Window)</option>
//               <option value="12B">12B (Middle)</option>
//               <option value="12C">12C (Aisle)</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Payment Section */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        
//         {/* Dummy Payment UI */}
//         <div className="border rounded-lg p-4 mb-4">
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Card Number</label>
//               <input
//                 type="text"
//                 placeholder="4242 4242 4242 4242"
//                 className="w-full p-2 border rounded bg-gray-100"
                
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Expiry</label>
//                 <input
//                   type="text"
//                   placeholder="MM/YY"
//                   className="w-full p-2 border rounded bg-gray-100"
                  
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">CVV</label>
//                 <input
//                   type="text"
//                   placeholder="123"
//                   className="w-full p-2 border rounded bg-gray-100"
                  
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Payment Status Messages */}
//         {paymentStatus === 'processing' && (
//           <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-lg flex items-center">
//             <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//             </svg>
//             Processing your payment...
//           </div>
//         )}

//         {paymentStatus === 'success' && (
//           <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
//             <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//             Payment successful! Redirecting...
//           </div>
//         )}

//         {paymentStatus === 'failed' && (
//           <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
//             Payment failed. Please try again or use a different card.
//           </div>
//         )}

//         <button
//           onClick={handlePayment}
//           disabled={isProcessing}
//           className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
//             isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           {isProcessing ? 'Processing...' : `Pay ₹${flight.price}`}
//         </button>

//         <p className="text-xs text-gray-500 mt-2 text-center">
//           This is a test payment gateway. No real transactions will be processed.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [flight, setFlight] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    age: '',
    seat: '12A' // Default seat
  });
  const [paymentDetails, setPaymentDetails] = useState({
    method: 'credit', // credit, debit, upi
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: ''
  });
  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Passenger validation
    if (!passengerDetails.name.trim()) {
      newErrors.passengerName = 'Name is required';
    }
    if (!passengerDetails.age || passengerDetails.age < 1 || passengerDetails.age > 120) {
      newErrors.passengerAge = 'Please enter a valid age';
    }
    
    // Payment validation based on method
    if (paymentDetails.method === 'credit' || paymentDetails.method === 'debit') {
      if (!paymentDetails.cardNumber || !/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!paymentDetails.expiry || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)) {
        newErrors.expiry = 'Enter valid expiry (MM/YY)';
      }
      if (!paymentDetails.cvv || !/^\d{3,4}$/.test(paymentDetails.cvv)) {
        newErrors.cvv = paymentDetails.method === 'credit' ? 'Enter 3-digit CVV' : 'Enter 4-digit CVV';
      }
    } else if (paymentDetails.method === 'upi') {
      if (!paymentDetails.upiId || !/^[\w.-]+@[\w]+$/.test(paymentDetails.upiId)) {
        newErrors.upiId = 'Enter a valid UPI ID (e.g., name@upi)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
  };

  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiry(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      expiry: formattedValue
    }));
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Randomly fail 10% of payments for testing
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        const paymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
        
        // Save booking to database
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            flight,
            paymentId,
            paymentMethod: paymentDetails.method,
            passengers: [passengerDetails],
            totalAmount: flight.price,
            userId: localStorage.getItem('userId')
          })
        });

        if (!response.ok) throw new Error('Failed to save booking');

        setPaymentStatus('success');
        localStorage.removeItem('selectedFlight');
        
        // Redirect to confirmation after 1.5 seconds
        setTimeout(() => {
          navigate('/booking-confirmation', {
            state: {
              flight,
              paymentId,
              passenger: passengerDetails,
              paymentMethod: paymentDetails.method
            }
          });
        }, 1500);
      } else {
        setPaymentStatus('failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!flight) return <div className="text-center py-8">Loading flight details...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
      
      {/* Flight Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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

      {/* Passenger Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={passengerDetails.name}
              onChange={handlePassengerChange}
              className={`w-full p-2 border rounded ${errors.passengerName ? 'border-red-500' : ''}`}
              required
            />
            {errors.passengerName && <p className="text-red-500 text-xs mt-1">{errors.passengerName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={passengerDetails.age}
              onChange={handlePassengerChange}
              className={`w-full p-2 border rounded ${errors.passengerAge ? 'border-red-500' : ''}`}
              required
              min="1"
              max="120"
            />
            {errors.passengerAge && <p className="text-red-500 text-xs mt-1">{errors.passengerAge}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Seat Preference</label>
            <select
              name="seat"
              value={passengerDetails.seat}
              onChange={handlePassengerChange}
              className="w-full p-2 border rounded"
            >
              <option value="12A">12A (Window)</option>
              <option value="12B">12B (Middle)</option>
              <option value="12C">12C (Aisle)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        
        {/* Payment Method Selection */}
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => setPaymentDetails(prev => ({ ...prev, method: 'credit' }))}
              className={`px-4 py-2 rounded-lg border ${paymentDetails.method === 'credit' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'}`}
            >
              Credit Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentDetails(prev => ({ ...prev, method: 'debit' }))}
              className={`px-4 py-2 rounded-lg border ${paymentDetails.method === 'debit' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'}`}
            >
              Debit Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentDetails(prev => ({ ...prev, method: 'upi' }))}
              className={`px-4 py-2 rounded-lg border ${paymentDetails.method === 'upi' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'}`}
            >
              UPI
            </button>
          </div>

          {/* Payment Form */}
          {paymentDetails.method === 'credit' || paymentDetails.method === 'debit' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4242 4242 4242 4242"
                  maxLength="19"
                  className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : ''}`}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    name="expiry"
                    value={paymentDetails.expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`w-full p-2 border rounded ${errors.expiry ? 'border-red-500' : ''}`}
                  />
                  {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                    placeholder={paymentDetails.method === 'credit' ? '123' : '1234'}
                    maxLength={paymentDetails.method === 'credit' ? 3 : 4}
                    className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : ''}`}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">UPI ID</label>
              <input
                type="text"
                name="upiId"
                value={paymentDetails.upiId}
                onChange={handlePaymentChange}
                placeholder="name@upi"
                className={`w-full p-2 border rounded ${errors.upiId ? 'border-red-500' : ''}`}
              />
              {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
            </div>
          )}
        </div>

        {/* Payment Status Messages */}
        {paymentStatus === 'processing' && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-lg flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
            Processing your payment...
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Payment successful! Redirecting...
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
            Payment failed. Please try again or use a different payment method.
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
            isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isProcessing ? 'Processing...' : `Pay ₹${flight.price}`}
        </button>

        <p className="text-xs text-gray-500 mt-2 text-center">
          This is a test payment gateway. No real transactions will be processed.
        </p>
      </div>
    </div>
  );
};

export default Payment;