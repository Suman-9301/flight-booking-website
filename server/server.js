const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
app.use(bodyParser.json());

const cors = require('cors');
// app.use(cors({
//   origin: "http://localhost:3000", // Allow frontend origin
//   credentials: true, // Allow cookies (if using sessions)
// }));
const db = require("./db");
const User = require("./user");
const Booking = require("./booking");
const axios = require("axios");
const crypto = require('crypto');
require('dotenv').config();

const {sendEmail} = require("./emailNotification/sendEmail");
const { registerEmail } = require("./emailNotification/registerEmail");
const {jwtAuthMiddleware,generateToken} = require("./jwt");
const { log } = require("console");
const {paymentSuccessEmail} = require("./emailNotification/paymentSuccessEmail");
const {bookingCancelEmail} = require("./emailNotification/bookingCancelEmail");
const {generateTicketPDF} = require("./generateTicketPDF");

const port = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;


app.use(cors());
app.use(express.json());


// POST route for user registration
app.post("/register", async (req, res) => {
  const { username, email, mobile, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "Email already registered",
        error: "An account with this email already exists. Please login instead."
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      mobile,
      password: hashedPassword
    });

    const response = await newUser.save();
    
    const token = generateToken({id: response.id, username: response.username, email: response.email, mobile: response.mobile });
    // console.log(token);
    

    res.status(201).json({
      token,
      user: {
        id: response.id,
        username: response.username,
        email: response.email,
        mobile: response.mobile
      }
    });

    //send email notification
    // sendEmail(email,"Welcome to SkyBooker!","",registerEmail(username,email));

    try {
      if (email) {
        await sendEmail(
          email,
          "Welcome to SkyBooker!",
          "",
          registerEmail(username, email)
        );
      } else {
        console.warn("No email found in request, skipping email notification.");
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error registering user", error: error.message });
  }
});


// POST route for user login (without JWT or sessions)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log("Login request:", req.body);

  try {
    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //generate JWT token
    const token = generateToken({id:user.id, username: user.username, email: user.email, mobile: user.mobile });

    // return token as response, simply send a success message
    // res.status(200).json({ message: "Login successful", username : user.username});
    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Flight search functionality
let fetchAPIData;
let fetchUserReq;

// POST route to handle flight search requests 
app.post("/search", (req, res) => {
  fetchUserReq = req.body;
  // console.log(fetchUserReq);

  let url = `https://serpapi.com/search.json?engine=google_flights&departure_id=${fetchUserReq.deptID}&arrival_id=${fetchUserReq.arrivalID}&outbound_date=${fetchUserReq.deptDate}&return_date=${fetchUserReq.returnDate}&currency=INR&travel_class=${fetchUserReq.fclass}&stop=1&api_key=${apiKey}`;

  // console.log(url);
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      fetchAPIData = data;
      res.send(fetchAPIData.other_flights);
    })
    .catch(error => console.error("Error:", error));

    // console.log(fetchAPIData+"s");
});

// GET route to fetch flight data
app.get("/api", (req, res) => {
  res.json(fetchAPIData);
});


//Cashfree Payment Integration

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_API_BASE = process.env.CASHFREE_API_BASE || 'https://sandbox.cashfree.com/pg';

// Generate a unique order ID
const generateOrderId = () => {
  return `SKY_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
};

// Endpoint to create payment session
app.post('/pay',jwtAuthMiddleware, async (req, res) => {
  try {
    const orderId = generateOrderId();
    // const orderAmount = req.query.amount || '100.00'; // Default amount or get from frontend
    const orderAmount = parseFloat(req.body.amount);
    if (isNaN(orderAmount)) {
      return res.status(400).json({ error: 'Invalid order amount' });
    }
    
    const customerDetails = {
      customer_id: req.user.id,
      customer_name: req.user.username,
      customer_email: req.user.email,
      customer_phone: req.user.mobile,
    };

    const requestData = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: 'INR',
      customer_details: customerDetails,
      order_meta: {
        return_url: 'http://localhost:3000/return?order_id={order_id}'
      }
    };

    const response = await axios.post(`${CASHFREE_API_BASE}/orders`, requestData, {
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2022-09-01',
        'Content-Type': 'application/json'
      }
    });

    console.log('pay orderid:',orderId);
    
    res.json({
      order_id: orderId,
      payment_session_id: response.data.payment_session_id
    });

  } catch (error) {
    console.error('Full error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create payment session',
      details: error.response?.data || error.message 
    });
  }
});

// Endpoint to verify payment
app.post('/verify',jwtAuthMiddleware, async (req, res) => {
  try {
    const { orderId,flight, totalAmount, passengerInfo } = req.body;

    console.log('verify orderid',orderId);
    

    if (!orderId || !flight || !totalAmount) {
      return res.status(400).json({ error: 'Missing required booking details' });
    }

    const response = await axios.get(`${CASHFREE_API_BASE}/orders/${orderId}`, {
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2022-09-01'
      }
    });
    // console.log('cashfree res:',response);

    const paymentStatus = response.data.order_status;
    // console.log('Payment status:', paymentStatus);
    
    if (paymentStatus === 'PAID') {

      const mainFlight = flight.flights[0]; 

      const simplifiedFlight = {
        airline: mainFlight.airline,
        airline_logo: mainFlight.airline_logo,
        from: mainFlight.departure_airport?.name || 'Unknown',
        to: mainFlight.arrival_airport?.name || 'Unknown',
        departure_time: mainFlight.departure_airport?.time ? new Date(mainFlight.departure_airport.time) : new Date(),
        arrival_time: mainFlight.arrival_airport?.time ? new Date(mainFlight.arrival_airport.time) : new Date(),
        flight_number: mainFlight.flight_number
      };
      
      
      const newBooking = new Booking({
        user: req.user.id,
        passengerInfo : passengerInfo,
        flight: simplifiedFlight,
        totalAmount: totalAmount,
        paymentId: orderId
      });

      await newBooking.save();
      //send payment successful email

      const bookingDetails = {
        paymentId: orderId,
        flight: simplifiedFlight,
        totalAmount: totalAmount,
        currency: 'INR',
        bookingDate: new Date(),
        status: 'confirmed'
      };
      
      res.json({ status: 'success', message: 'Payment verified successfully' });

      // sendEmail(req.email,"Welcome to SkyBooker!","",paymentSuccessEmail(req.username, bookingDetails));
      try {
        if (req.user.email) {
          await sendEmail(
            req.user.email,
            "Your SkyBooker Flight Booking is Confirmed!",
            "",
            paymentSuccessEmail(req.user.username, bookingDetails)
          );
        } else {
          console.warn("No email found in request, skipping email notification.");
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError.message);
      }

    } else {
      res.status(400).json({ status: 'failed', message: 'Payment not completed' });
    }

  } catch (error) {
    console.error('Error verifying payment:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to verify payment',
      details: error.response?.data || error.message 
    });
  }
});

// GET user profile
app.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Server error in /profile:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PUT (update) user profile
app.put("/profile", jwtAuthMiddleware, async (req, res) => {
  const { username, email, mobile } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username || user.username;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;

    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      mobile: updatedUser.mobile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//get booking details
app.get("/my-bookings", jwtAuthMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ bookingDate: -1 });
    res.json(bookings);
    console.log("Bookings:", bookings);
    
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

//cancel booking
app.put("/cancel-booking/by-payment/:paymentId", jwtAuthMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      paymentId: req.params.paymentId, 
      user: req.user.id 
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const now = new Date();
    const depTime = new Date(booking.flight.departure_time);

    if (now > depTime) {
      return res.status(400).json({ error: "Flight already departed. Cannot cancel." });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });

    try {
      if (req.user.email) {
        await sendEmail(
          req.user.email,
          "Your SkyBooker Flight Booking Has Been Cancelled",
          "",
          bookingCancelEmail(req.username, booking)
        );
      } else {
        console.warn("No email found in request, skipping email notification.");
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

  } catch (err) {
    console.error("Cancel error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/download/:bookingId',jwtAuthMiddleware, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { bookingId } = req.params;
    const booking = await Booking.findOne({ bookingId });
    
    
    if (!booking) return res.status(404).send('Booking not found');

    const pdfBytes = await generateTicketPDF(booking);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=SkyBooker_Ticket_${bookingId}.pdf`
    );

    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Server Error');
  }
});




// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
