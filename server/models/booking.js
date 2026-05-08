const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'CheckedIn', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking