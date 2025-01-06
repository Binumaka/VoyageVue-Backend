const TourPackage = require("../model/tourpackagesModel");

// Get all tour packages
const findAllPackages = async (req, res) => {
    try {
        const packages = await TourPackage.find().populate(["destination", "accommodation"]);
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new tour package
const createPackage = async (req, res) => {
    try {
        const { name, destinations, guide, accommodation, price, duration, description } = req.body;

        const newPackage = new TourPackage({
            name,
            destinations,
            guide,
            accommodation,
            price,
            duration,
            description,
        });

        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    findAllPackages, 
    createPackage 
};
