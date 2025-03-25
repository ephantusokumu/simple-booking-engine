const { Booking, Tour } = require('../models');
const { convertCurrency } = require('../services/currencyService');



exports.createBooking = async (req, res) => {
    try {
        const { tourId, amount, currency } = req.body;

        if (!tourId || !amount || !currency) {
            throw new Error("Tour ID, amount, and currency are required.");
        }

        // Convert amount to USD if necessary //This is also an extra feature
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