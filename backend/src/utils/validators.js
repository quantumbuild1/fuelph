const Joi = require('joi');

const validateFuelPrice = (data) => {
  const schema = Joi.object({
    stationId: Joi.number().positive().required(),
    fuelType: Joi.string().valid('Unleaded', 'Diesel', 'Premium', 'LPG').required(),
    price: Joi.number().positive().required(),
  });
  return schema.validate(data);
};

const validateStation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    brand: Joi.string().min(2).max(50).required(),
    city: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = { validateFuelPrice, validateStation };
