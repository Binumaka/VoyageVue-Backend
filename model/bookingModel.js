const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "destination",
        required: true,
    },
    accommodationId: {
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
