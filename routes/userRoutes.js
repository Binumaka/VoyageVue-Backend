const express = require("express");
const {findAll,findById,deleteById, update} = require("../controller/userController");

const router= express.Router();

router.get("/",findAll);
router.get("/users", findById);
router.delete("/:id", deleteById);
router.put("/:id", update)

module.exports= router;