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

const save = async (req, res) => {
  try {
    const { title, category, bestTimeToVisit, location, description, section } = req.body;

    if (!title || !description || !section || !bestTimeToVisit || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Handle images if uploaded
    const image = req.files ? req.files['image'] ? req.files['image'][0].filename : null : null;
    const image1 = req.files ? req.files['image1'] ? req.files['image1'][0].filename : null : null;
    const image2 = req.files ? req.files['image2'] ? req.files['image2'][0].filename : null : null;

    const destination = new Destination({
      category,
      title,
      description,
      bestTimeToVisit,
      location,
      section,
      image,
      image1,
      image2,
    });

    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    console.error("Error creating destination:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    const { id } = req.params;

    // Find the existing destination
    const existingDestination = await Destination.findById(id);
    if (!existingDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const updatedData = { ...req.body };

    // Handle new images if uploaded
    if (req.files) {
      updatedData.image = req.files['image'] ? req.files['image'][0].filename : existingDestination.image;
      updatedData.image1 = req.files['image1'] ? req.files['image1'][0].filename : existingDestination.image1;
      updatedData.image2 = req.files['image2'] ? req.files['image2'][0].filename : existingDestination.image2;
    }

    // Update the destination document
    const updatedDestination = await Destination.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: "Destination updated", data: updatedDestination });
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getDestinationBySection = async (req, res) => {
  try {
    const { section } = req.params; // Use params instead of query for consistency
    const destinations = await Destination.find({ section });

    if (!destinations || destinations.length === 0) {
      return res
        .status(404)
        .json({ error: "No destinations found for the specified section" });
    }

    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error getting destination by section:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while getting destination by section",
      });
  }
};

const getDestinationByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const destinations = await Destination.find({ category });

    if (!destinations || destinations.length === 0) {
      return res
        .status(404)
        .json({ error: "No destinations found for the specified category" });
    }

    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error getting destination by category:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while getting destination by category",
      });
  }
};

module.exports = {
  findAll,
  save,
  findById,
  deleteById,
  update,
  getDestinationBySection,
  getDestinationByCategory,
};
