const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "destination",
        required: true,
    },
});

const Accommodation = mongoose.model("accommodation", accommodationSchema);

module.exports = Accommodation;
