const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "destination",
        required: true,
    },
    accommodation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accommodation",
        required: true,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true, 
});

const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
