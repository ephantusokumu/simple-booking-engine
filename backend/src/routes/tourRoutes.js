const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const authMiddleware = require('../middleware/authMiddleware');


router.get("/", tourController.getTours);
// POST /api/tours - Create new tour (Admin)
router.post("/", authMiddleware, tourController.createTour);
// GET /api/tours/:id - Get tour details
router.get("/:id", tourController.getTourDetails);

module.exports = router;