const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
app.use(bodyParser.json());
const db = require("./db");
const User = require("./user");
require('dotenv').config();

const port = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;

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

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error registering user", error: error.message });
  }
});


// POST route for user login (without JWT or sessions)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // No session or JWT, simply send a success message
    res.status(200).json({ message: "Login successful", username : user.username});
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
  console.log(fetchUserReq);

  let url = `https://serpapi.com/search.json?engine=google_flights&departure_id=${fetchUserReq.deptID}&arrival_id=${fetchUserReq.arrivalID}&outbound_date=${fetchUserReq.deptDate}&return_date=${fetchUserReq.returnDate}&currency=INR&travel_class=${fetchUserReq.fclass}&stop=1&api_key=${apiKey}`;

  console.log(url);
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      fetchAPIData = data;
      res.send(fetchAPIData.other_flights);
    })
    .catch(error => console.error("Error:", error));

    console.log(fetchAPIData+"s");
});

// GET route to fetch flight data
app.get("/api", (req, res) => {
  res.json(fetchAPIData);
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
