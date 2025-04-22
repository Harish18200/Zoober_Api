const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderDetail = sequelize.define('order_details', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ride_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    order_name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    cash_type: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    kilometer: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, amount: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, pickup: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    dropoff: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tripfare: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
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
    tableName: 'order_details',
    timestamps: false,
});

module.exports = OrderDetail;
