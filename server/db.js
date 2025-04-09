require('dotenv').config();
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL;


mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("Error connecting to MongoDB:", err));

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB database");
});

db.on("connected", () => {
  console.log("Connected to MongoDB database");
});

module.exports = db;