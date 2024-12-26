const Booking = require("../model/bookingModel");

// Get all bookings
const findAll = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings", details: error.message });
  }
};

const save = async (req, res) => {
  try {
    const { user, accommodation, checkInDate, checkOutDate, totalPrice } = req.body;

    if (!user || !accommodation || !checkInDate || !checkOutDate || !totalPrice) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBooking = new Booking(req.body);

    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to save booking", details: error.message });
  }
};

module.exports = {
  findAll,
  save,
};
