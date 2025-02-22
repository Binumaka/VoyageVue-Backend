const Booking = require("../model/bookingModel");
const User = require("../model/userModel");

const findAll = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("destinationId").populate("accommodationId").populate("guideId").populate("userId");
        res.status(200).json(bookings);
    } catch (e) {
        console.error("Error fetching bookings:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const create = async (req, res) => {
    try {
      const { userId, destinationId, accommodationId, guideId, checkInDate, checkOutDate, totalPrice } = req.body;
  
      // Validate required fields
      if (!userId || !destinationId || !accommodationId || !guideId || !checkInDate || !checkOutDate || !totalPrice) {
        return res.status(400).json({ error: "Missing required fields." });
      }
  
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Create a new booking
      const booking = await Booking.create({
        userId,
        destinationId,
        accommodationId,
        guideId,
        checkInDate,
        checkOutDate,
        totalPrice,
      });
  
      res.status(200).json({ success: true, booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

const findById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("destinationId").populate("accommodationId").populate("guideId").populate("userId");
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (e) {
        console.error("Error fetching booking by ID:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const findByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        
        const bookings = await Booking.find({ userId }).populate("destinationId").populate("accommodationId").populate("guideId");
        if (bookings.length === 0) {
            return res.status(404).json({ error: "No bookings found for this user" });
        }
        res.status(200).json(bookings);
    } catch (e) {
        console.error("Error fetching bookings by user:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteById = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted" });
    } catch (e) {
        console.error("Error deleting booking:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const update = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("destinationId").populate("accommodationId").populate("guideId").populate("userId");
        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json({ message: "Booking updated", data: updatedBooking });
    } catch (e) {
        console.error("Error updating booking:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    findAll,
    create,
    findById,
    findByUser,
    deleteById,
    update,
};
