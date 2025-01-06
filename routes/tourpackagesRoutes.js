const express = require("express");
const router = express.Router();
const { findAllPackages, createPackage } = require("../controller/tourpackagesController");

router.get("/find", findAllPackages);
router.post("/save", createPackage);

module.exports = router;
