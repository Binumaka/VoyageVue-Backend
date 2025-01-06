const mongoose = require("mongoose");

const tourPackageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        destinations:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "destination",
        },
        guide: {
            type: String, 
        },
        accommodation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "accommodation",
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
