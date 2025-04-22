const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vehicle = sequelize.define('vehicles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ride_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    brand: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    model: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    model_year: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, license_plate: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, color: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    booking_type: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    deleted_at: {
        type: DataTypes.NOW,
        allowNull: true,

    },

}, {
    tableName: 'vehicles',
    timestamps: false,
});

module.exports = Vehicle;
