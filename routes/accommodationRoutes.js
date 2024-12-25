const express = require("express");
const { findAll, save, findByDestination, findById, deleteById, update } = require("../controller/AccommodationController");

const router = express.Router();

// Routes for accommodations
router.get("/", findAll);
router.post("/", save);
router.get("/destination/:destinationId", findByDestination);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id", update);

module.exports = router;
