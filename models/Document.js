const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Document = sequelize.define('documents', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ride_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    photo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    card_number: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, expired_date: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, status: {
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
    tableName: 'documents',
    timestamps: false,
});

module.exports = Document;
