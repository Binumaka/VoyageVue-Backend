const mongoose = require("mongoose");

const tourPackageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        highlights: {
            type: String,
            required: true,
        },
        itinerary: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);
module.exports = TourPackage;
