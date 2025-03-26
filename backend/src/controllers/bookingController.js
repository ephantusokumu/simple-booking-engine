const { Booking, Tour } = require('../models');
const { convertCurrency } = require('../services/currencyService');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { tourId, amount, currency } = req.body;

        if (!tourId || !amount || !currency) {
            throw new Error("Tour ID, amount, and currency are required.");
        }

        // Convert amount to USD if necessary
        let finalAmount = amount;
        if (currency !== "USD") {
            finalAmount = await convertCurrency(amount, currency, "USD");
        }

        const booking = await Booking.create({
            userId: req.user.userId,
            UserId: req.user.userId,
            tourId,
            TourId: tourId,
            amount: finalAmount,
            status: "pending",
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error("Booking creation error:", error);
        res.status(400).json({ error: error.message });
    }
};

// Get all bookings (Admin-only route)//WIP
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [Tour]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: [Tour]
        });
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a booking by ID
exports.deleteBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        await booking.destroy();
        res.status(204).send(); // No content on successful deletion
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user-specific bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: { userId: req.user.id },
            include: [Tour]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};