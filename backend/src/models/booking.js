module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        UserId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: false,
        },

        TourId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'failed'),
            defaultValue: 'pending'
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    });

    Booking.associate = models => {
        Booking.belongsTo(models.User, { foreignKey: "userId" });
        Booking.belongsTo(models.Tour, { foreignKey: "tourId" });
        Booking.hasOne(models.Payment);
    };

    return Booking;
};