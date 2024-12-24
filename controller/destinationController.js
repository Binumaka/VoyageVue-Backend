const Destination = require("../model/destinationModel");

// Get all destinations
const findAll = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).json(destinations);
    } catch (e) {
        res.json(e);
    }
};

// Create a new destination
const save = async (req, res) => {
    try {
        const destination = new Destination(req.body);
        await destination.save();
        res.status(201).json(destination);
    } catch (e) {
        res.json(e);
    }
};

// Get a specific destination by ID
const findById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json("Destination not found");
        }
        res.status(200).json(destination);
    } catch (e) {
        res.json(e);
    }
};

// Delete a specific destination by ID
const deleteById = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (!destination) {
            return res.status(404).json("Destination not found");
        }
        res.status(200).json("Destination deleted");
    } catch (e) {
        res.json(e);
    }
};

// Update a specific destination by ID
const update = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!destination) {
            return res.status(404).json("Destination not found");
        }
        res.status(200).json("Destination updated");
    } catch (e) {
        res.json(e);
    }
};

module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update,
};
