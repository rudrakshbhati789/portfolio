const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

module.exports = router;
