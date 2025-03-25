const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");

// GET /api/tours - Fetch all tours
router.get("/", tourController.getTours);

module.exports = router;