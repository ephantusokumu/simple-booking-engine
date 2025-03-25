"use strict";

module.exports = {
    up: async (queryInterface) => {
        // Insert sample tours for Kenya
        await queryInterface.bulkInsert("Tours", [
            {
                id: "a1b2c3d4-5678-4012-3456-7e8f9a1b2c3d",
                name: "Maasai Mara Safari",
                description:
                    "Experience the breathtaking wildlife of the Maasai Mara National Reserve. Witness the Great Migration and spot the Big Five.",
                price: 500.0,
                duration: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "b2c3d4e5-6789-4012-4567-8f9a1b2c3d4e",
                name: "Mount Kenya Trek",
                description:
                    "Embark on an adventurous trek to the summit of Mount Kenya, Africa's second-highest peak. Enjoy stunning views and diverse ecosystems.",
                price: 700.0,
                duration: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "c3d4e5f6-7890-4012-5678-9a1b2c3d4e5f",
                name: "Diani Beach Getaway",
                description:
                    "Relax on the pristine white sands of Diani Beach. Enjoy water sports, coral reefs, and luxurious beach resorts.",
                price: 400.0,
                duration: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "d4e5f6a7-8901-4012-6789-a1b2c3d4e5f6",
                name: "Amboseli National Park Tour",
                description:
                    "Visit Amboseli National Park, famous for its large elephant herds and views of Mount Kilimanjaro.",
                price: 450.0,
                duration: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "e5f6a7b8-9012-4012-7890-a1b2c3d4e5f6",
                name: "Lamu Island Cultural Tour",
                description:
                    "Explore the rich Swahili culture and architecture of Lamu Island, a UNESCO World Heritage Site.",
                price: 350.0,
                duration: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("Tours", null, {});
    },
};