const { FuelPrice, Station } = require('../models');
const { validateFuelPrice } = require('../utils/validators');
const logger = require('../middleware/logger');

class FuelController {
  // Get all fuel prices with filters
  static async getAllPrices(req, res, next) {
    try {
      const { city, fuelType, limit = 50, offset = 0 } = req.query;
      
      let where = {};
      if (city) where.city = city;
      if (fuelType) where.fuelType = fuelType;

      const prices = await FuelPrice.findAndCountAll({
        include: [{ model: Station, attributes: ['name', 'brand', 'city', 'latitude', 'longitude'] }],
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['lastUpdated', 'DESC']],
      });

      res.json({
        success: true,
        data: prices.rows,
        pagination: {
          total: prices.count,
          limit,
          offset,
        },
      });
    } catch (error) {
      logger.error('Error fetching fuel prices:', error);
      next(error);
    }
  }

  // Get price by ID
  static async getPriceById(req, res, next) {
    try {
      const { id } = req.params;
      
      const price = await FuelPrice.findByPk(id, {
        include: [{ model: Station }],
      });

      if (!price) {
        return res.status(404).json({
          success: false,
          message: 'Fuel price not found',
        });
      }

      res.json({ success: true, data: price });
    } catch (error) {
      next(error);
    }
  }

  // Add new fuel price
  static async addPrice(req, res, next) {
    try {
      const { error, value } = validateFuelPrice(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const fuelPrice = await FuelPrice.create(value);

      res.status(201).json({
        success: true,
        message: 'Fuel price added successfully',
        data: fuelPrice,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get price trend
  static async getPriceTrend(req, res, next) {
    try {
      const { stationId, days = 7 } = req.query;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const trend = await FuelPrice.findAll({
        where: {
          stationId,
          lastUpdated: { [Op.gte]: startDate },
        },
        order: [['lastUpdated', 'ASC']],
      });

      res.json({ success: true, data: trend });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FuelController;
