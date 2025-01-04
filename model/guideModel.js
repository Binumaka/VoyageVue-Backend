const mongoose = require("mongoose");

// Define the guide schema
const guideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    experience: {
        type: Number,
        required: true, 
    },
    languages: {
        type: [String],
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true,
    },
});

// Create the Guide model
const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
