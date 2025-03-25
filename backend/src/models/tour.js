module.exports = (sequelize, DataTypes) => {
    const Tour = sequelize.define('Tour', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }
    });

    Tour.associate = models => {
        Tour.hasMany(models.Booking);
    };

    return Tour;
};