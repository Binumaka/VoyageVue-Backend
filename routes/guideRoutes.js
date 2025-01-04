const express = require("express");
const {findAll, save, update } = require("../controller/guideController");

const router= express.Router();

router.get("/",findAll);
router.post("/",save);
router.put("/:id", update)

module.exports= router;