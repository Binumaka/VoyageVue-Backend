const express = require("express");
const {
  create,
  findAll,
  findById,
  findByUser,
  deleteById,
  update
} = require("../controller/bookingController");

const router = express.Router();

router.post("/create", create);
router.get("/", findAll);
router.get("/:id", findById);
router.get("/user/:userId", findByUser);
router.put("/:id", update);
router.delete("/:id", deleteById);

module.exports = router;
