const TourPackage = require("../model/tourpackagesModel");

// Get all tour packages
const findAllPackages = async (req, res) => {
  try {
    const packages = await TourPackage.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new tour package
const createPackage = async (req, res) => {
  try {
    const { title, highlights, itinerary, price, duration, description } = req.body;

    if (!title || !highlights || !itinerary || !price || !duration || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const image = req.files ? req.files['image'] ? req.files['image'][0].filename : null : null;
    const image1 = req.files ? req.files['image1'] ? req.files['image1'][0].filename : null : null;

    const newPackage = new TourPackage({
      title,
      image,
      image1,
      highlights: JSON.parse(highlights), 
      itinerary: JSON.parse(itinerary), 
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

const findById = async (req, res) => {
  try {
    const packages = await TourPackage.findById(req.params.id);
    if (!packages) {
      return res.status(404).json("Packages not found");
    }
    res.status(200).json(packages);
  } catch (e) {
    res.json(e);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    let updatedData = { ...req.body };

    // Parse 'highlights' and 'itinerary' if they are sent as strings
    if (typeof updatedData.highlights === "string") {
      try {
        updatedData.highlights = JSON.parse(updatedData.highlights);
        if (!Array.isArray(updatedData.highlights)) throw new Error();
      } catch {
        return res.status(400).json({ message: "Invalid format for highlights" });
      }
    }

    if (typeof updatedData.itinerary === "string") {
      try {
        updatedData.itinerary = JSON.parse(updatedData.itinerary);
        if (!Array.isArray(updatedData.itinerary)) throw new Error();
      } catch {
        return res.status(400).json({ message: "Invalid format for itinerary" });
      }
    }

    const updatedPackage = await TourPackage.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: "Tour package updated", data: updatedPackage });
  } catch (error) {
    console.error("Error updating tour package:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


const deleteById = async (req, res) => {
  try {
    const packages = await TourPackage.findByIdAndDelete(req.params.id);
    if (!packages) {
      return res.status(404).json("TourPackage not found");
    }
    res.status(200).json("TourPackage deleted");
  } catch (e) {
    res.json(e);
  }
};

module.exports = {
  findAllPackages,
  createPackage,
  findById,
  update,
  deleteById,
};
