const express = require ("express");
const {save} = require("../controller/bookingController");

const router = express.Router();

router.post("/save", save);

module.exports = router;
