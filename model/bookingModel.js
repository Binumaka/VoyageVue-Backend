const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    accommodation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accommodation",
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "canceled"],
        default: "pending",
    },
}, {
    timestamps: true, 
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
