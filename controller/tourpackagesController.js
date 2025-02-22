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
        const { title, image, highlights, itinerary, price, duration, description } = req.body;

        if (!title || !highlights || !itinerary || !price || !duration || !description){
            return res.status(400).json({ error: "All fields are required" });
        }

        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);

        const newPackage = new TourPackage({
            title,
            image: req.file ? req.file.originalname : null,
            highlights,
            itinerary,
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

const update = async (req,  res) => {
    try{
        const packages = await TourPackage.findByIdAndUpdate(
            req.parms.id,
            req.body,
            {new:true}
        );
        if (!packages) {
            return res.status(404).json("Tour packages not found");
        }
        res.status(200).json("Tour Packages updated");
    }catch (e) {
        res.json(e);
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
    update,
    deleteById,
};
