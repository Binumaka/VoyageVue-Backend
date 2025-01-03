const Booking = require("../model/bookingModel");

const save = async (req, res, next) => {
  try {
    const {
      userId,
      destinationId,
      accommodationId,
      checkInDate,
      checkOutDate,
      totalPrice,
    } = req.body;

    // Validate required fields
    if (!userId || !destinationId || !accommodationId || !checkInDate || !checkOutDate || !totalPrice) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if checkInDate is before checkOutDate
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res.status(400).json({ error: "Check-in date must be before check-out date." });
    }

    const newBooking = new Booking({
      userId,
      destinationId,
      accommodationId,
      checkInDate: new Date(checkInDate), 
      checkOutDate: new Date(checkOutDate), 
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (e) {
    console.error("Error saving booking:", e);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { save };