const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: String },
  airline_logo: { type: String },
  from: { type: String },
  to: { type: String },
  departure_time: { type: Date },
  arrival_time: { type: Date },
  flight_number: { type: String }
});

const passengerSchema = new mongoose.Schema({
  passengerName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date, required: true },
  nationality: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  seatPreference: { type: String, enum: ['Window', 'Aisle', 'Middle'], required: true }
});

const bookingSchema = new mongoose.Schema({
  bookingId: { 
    type: String, 
    required: true, 
    unique: true, 
    default: () => `BK-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: flightSchema, required: true },
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentId: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  passengerInfo: { type: passengerSchema, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
