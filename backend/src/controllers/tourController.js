const { Tour } = require("../models");

exports.getTours = async (req, res) => {
    try {
        const tours = await Tour.findAll();
        res.json(tours);
    } catch (error) {
        console.error("Error fetching tours:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};