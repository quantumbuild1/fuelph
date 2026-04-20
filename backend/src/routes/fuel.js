const express = require('express');
const router = express.Router();
const FuelController = require('../controllers/fuelController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/prices', FuelController.getAllPrices);
router.get('/prices/:id', FuelController.getPriceById);
router.get('/trend', FuelController.getPriceTrend);

// Protected routes
router.post('/prices', verifyToken, FuelController.addPrice);

module.exports = router;
