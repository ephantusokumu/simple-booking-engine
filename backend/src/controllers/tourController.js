const { Tour } = require("../models");

// GET /tours
exports.getTours = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;

        const tours = await Tour.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.json({
            data: tours.rows,
            pagination: {
                total: tours.count,
                page: parseInt(page),
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        console.error("Error fetching tours:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// POST /tours
exports.createTour = async (req, res) => {
    try {
        const { name, price, description, duration, images } = req.body;

        // Validate required fields
        if (!name || !price) {
            return res.status(400).json({
                error: "Validation failed",
                details: {
                    name: !name ? "Name is required" : undefined,
                    price: !price ? "Price is required" : undefined,
                },
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                error: "Validation failed",
                details: {
                    price: "Price must be greater than 0",
                },
            });
        }

        // Create the tour in the database
        const tour = await Tour.create({
            id: req.body.id || undefined, // Allow custom ID if provided
            name,
            price,
            description: description || null,
            duration: duration || null,
            images: images || [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json(tour);
    } catch (error) {
        console.error("Error creating tour:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};
// GET /tours/:id
exports.getTourDetails = async (req, res) => {
    try {
        const tour = await Tour.findByPk(req.params.id);
        if (!tour) {
            return res.status(404).json({ error: "Tour not found" });
        }
        res.json(tour);
    } catch (error) {
        console.error("Error fetching tour details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};