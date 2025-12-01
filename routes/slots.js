const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot.js");

// Get all slots
router.get("/", async (req, res) => {
  const slots = await Slot.find();
  let result = {};
  slots.forEach(s => result[s.service] = s.slots);
  res.json(result);
});

// Add/Update slots (Admin Panel)
router.post("/", async (req, res) => {
  const { service, slots } = req.body;
  const existing = await Slot.findOne({ service });
  if (existing) {
    existing.slots = slots;
    await existing.save();
  } else {
    const newSlot = new Slot({ service, slots });
    await newSlot.save();
  }
  res.json({ message: "Slots updated!" });
});

module.exports = router;
