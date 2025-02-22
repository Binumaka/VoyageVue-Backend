const Accommodation = require("../model/AccommodationModel");
const Destination = require("../model/destinationModel");

const findAll = async (req, res) => {
    try {
        const accommodations = await Accommodation.find().populate("destination");
        res.status(200).json(accommodations);
    } catch (e) {
        console.error("Error fetching accommodations:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const save = async (req, res) => {
    try {
        const { title, price, description, destination } = req.body;

        if (!title || !price || !description || !destination) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const destinationExists = await Destination.findById(destination);
        if (!destinationExists) {
            return res.status(404).json({ error: "Destination not found" });
        }

        const accommodation = new Accommodation({
            title,
            price,
            description,
            destination,
            image: req.file ? req.file.originalname : null,
        });

        await accommodation.save();
        res.status(201).json(accommodation);
    } catch (e) {
        console.error("Error saving accommodation:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const findByDestination = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Destination ID is required" });
        }

        const accommodations = await Accommodation.find({ destination: id }).populate("destination");
        if (accommodations.length === 0) {
            return res.status(404).json({ error: "No accommodations found for this destination" });
        }
        res.status(200).json(accommodations);
    } catch (e) {
        console.error("Error fetching accommodations by destination:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const findById = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id).populate("destination");
        if (!accommodation) {
            return res.status(404).json({ error: "Accommodation not found" });
        }
        res.status(200).json(accommodation);
    } catch (e) {
        console.error("Error fetching accommodation by ID:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteById = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ error: "Accommodation not found" });
        }
        res.status(200).json({ message: "Accommodation deleted" });
    } catch (e) {
        console.error("Error deleting accommodation:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const update = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!accommodation) {
            return res.status(404).json({ error: "Accommodation not found" });
        }

        const updatedData = {...req.body};

        if(req.file){
            updatedData.image - req.file.path;
        }else {
            updatedData.image = existingAccommodation.image;
        }
        
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, updatedData,{new:true});

        res.status(200).json({message: "Accommodation updated", data: updatedAccommodation});
    } catch (e) {
        console.error("Error updating accommodation:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    findAll,
    save,
    findByDestination,
    findById,
    deleteById,
    update,
};
