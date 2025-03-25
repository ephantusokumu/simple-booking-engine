module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Create Users Table
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });

        // Create Tours Table
        await queryInterface.createTable('Tours', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            duration: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });

        // Create Bookings Table
        await queryInterface.createTable('Bookings', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            tourId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Tours',
                    key: 'id'
                }
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed', 'failed'),
                defaultValue: 'pending'
            },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });

        // Create Payments Table
        await queryInterface.createTable('Payments', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            bookingId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Bookings',
                    key: 'id'
                }
            },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            currency: {
                type: Sequelize.STRING(3),
                defaultValue: 'USD'
            },
            status: {
                type: Sequelize.ENUM('pending', 'completed', 'failed'),
                defaultValue: 'pending'
            },
            stripePaymentId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });

        // Add Indexes
        await queryInterface.addIndex('Users', ['email'], { unique: true });
        await queryInterface.addIndex('Bookings', ['userId']);
        await queryInterface.addIndex('Bookings', ['tourId']);
        await queryInterface.addIndex('Payments', ['bookingId']);
    },

    down: async (queryInterface) => {
        // Drop tables in reverse order
        await queryInterface.dropTable('Payments');
        await queryInterface.dropTable('Bookings');
        await queryInterface.dropTable('Tours');
        await queryInterface.dropTable('Users');
    }
};