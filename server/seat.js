const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true }, 
  flightId: { type: String, required: true },
  status: {
    type: String,
    enum: ['booked', 'unbooked'],
    default: 'unbooked'
  },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Seat', seatSchema);
