const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  date: String,
  time: String,
  message: String,
  created: String
});

module.exports = mongoose.model("Booking", bookingSchema);
