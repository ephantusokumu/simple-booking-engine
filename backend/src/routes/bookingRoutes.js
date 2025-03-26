const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, bookingController.createBooking);

router.get('/all', authMiddleware, bookingController.getAllBookings);

router.get('/:id', authMiddleware, bookingController.getBookingById);

router.delete('/:id', authMiddleware, bookingController.deleteBookingById);

router.get('/', authMiddleware, bookingController.getUserBookings);

module.exports = router;