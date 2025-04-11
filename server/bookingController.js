// // controllers/bookingController.js
// const Booking = require('./booking');

// // Create new booking
// exports.createBooking = async (req, res) => {
//   try {
//     const { flight, paymentId, userId, passengers, totalAmount } = req.body;
    
//     const booking = new Booking({
//       user: userId,
//       flight,
//       paymentId,
//       passengers,
//       totalAmount
//     });

//     await booking.save();
    
//     res.status(201).json({
//       success: true,
//       data: booking
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

// // Get user bookings
// exports.getUserBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user.id })
//       .sort('-createdAt')
//       .populate('user', 'name email');

//     res.json({
//       success: true,
//       count: bookings.length,
//       data: bookings
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

// // Get single booking
// exports.getBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id)
//       .populate('user', 'name email');

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         error: 'Booking not found'
//       });
//     }

//     res.json({
//       success: true,
//       data: booking
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

// // Cancel booking
// exports.cancelBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         error: 'Booking not found'
//       });
//     }

//     // Check if booking belongs to user
//     if (booking.user.toString() !== req.user.id) {
//       return res.status(401).json({
//         success: false,
//         error: 'Not authorized'
//       });
//     }

//     // Check if booking can be cancelled
//     if (booking.status === 'cancelled') {
//       return res.status(400).json({
//         success: false,
//         error: 'Booking already cancelled'
//       });
//     }

//     booking.status = 'cancelled';
//     await booking.save();

//     // TODO: Initiate refund process if needed

//     res.json({
//       success: true,
//       data: booking
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

const Booking = require('../models/Booking');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { flight, paymentId, passengers, totalAmount } = req.body;
    const userId = req.user.id; // From auth middleware
    
    // Validate passenger data
    if (!passengers || passengers.length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one passenger is required"
      });
    }

    const booking = new Booking({
      user: userId,
      flight,
      paymentId,
      passengers,
      totalAmount
    });

    await booking.save();
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort('-createdAt');

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Verify booking ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized to cancel this booking'
      });
    }

    // Check if already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Booking is already cancelled'
      });
    }

    // Check if cancellation is allowed (e.g., not within 24hrs of departure)
    const departureTime = new Date(booking.flight.flights[0].departure_airport.time);
    const now = new Date();
    const hoursToDeparture = (departureTime - now) / (1000 * 60 * 60);

    if (hoursToDeparture < 24) {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel within 24 hours of departure'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    // TODO: Add refund logic if applicable
    // await initiateRefund(booking.paymentId);

    res.json({
      success: true,
      data: booking,
      message: 'Booking cancelled successfully'
    });
  } catch (err) {
    console.error('Cancellation error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};