const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('FuelPrice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Stations', key: 'id' },
    },
    fuelType: {
      type: DataTypes.ENUM('Unleaded', 'Diesel', 'Premium', 'LPG'),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'fuel_prices',
    timestamps: true,
  });
};
