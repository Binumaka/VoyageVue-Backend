const Guide = require("../model/guideModel");

// Get all guides
const findAll = async (req, res) => {
    try {
        const guides = await Guide.find();
        res.status(200).json(guides);
    } catch (e) {
        res.status(500).json(e);
    }
};

// Create a new guide
const save = async (req, res) => {
    try {
        const guide = new Guide(req.body);
        await guide.save();
        res.status(201).json(guide);
    } catch (e) {
        res.status(400).json(e);
    }
};

// Delete a specific guide by ID
const deleteById = async (req, res) => {
    try {
        const guide = await Guide.findByIdAndDelete(req.params.id);
        if (!guide) {
            return res.status(404).json("Guide not found");
        }
        res.status(200).json("Guide deleted");
    } catch (e) {
        res.status(500).json(e);
    }
};

// Update a specific guide by ID
const update = async (req, res) => {
    try {
        const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!guide) {
            return res.status(404).json("Guide not found");
        }
        res.status(200).json("Guide updated");
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = {
    findAll,
    save,
    deleteById,
    update,
};
