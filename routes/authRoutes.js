const express = require("express");
const {test, loginUser, registerUser} = require("../controller/authController");

const router= express.Router();

router.get("/",test);
router.post("/login",loginUser);
router.post("/register",registerUser);


module.exports= router;