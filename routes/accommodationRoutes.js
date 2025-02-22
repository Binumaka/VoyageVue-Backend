const express = require("express");
const { findAll, save, findByDestination, findById, deleteById, update } = require("../controller/AccommodationController");

const router = express.Router();

const multer = require("multer");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept all files
  cb(null, true);
};

// // Initialize Multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Routes for accommodations
router.get("/", findAll);
router.post("/",upload.single("image"), save);
router.get("/destination/:id", findByDestination);
router.get("/select/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id",upload.single("image"), update);

module.exports = router;
