// server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data: list of fuel prices
let fuelPrices = [
    { id: 1, type: 'Gasoline', price: 3.19, date: '2026-03-31' },
    { id: 2, type: 'Diesel', price: 3.49, date: '2026-03-31' },
];

// Endpoint to get all fuel prices
app.get('/api/fuel-prices', (req, res) => {
    res.json(fuelPrices);
});

// Endpoint to get fuel price by id
app.get('/api/fuel-prices/:id', (req, res) => {
    const fuelPrice = fuelPrices.find(f => f.id === parseInt(req.params.id));
    if (!fuelPrice) return res.status(404).send('Fuel price not found');
    res.json(fuelPrice);
});

// Endpoint to add a new fuel price
app.post('/api/fuel-prices', (req, res) => {
    const newPrice = {
        id: fuelPrices.length + 1,
        type: req.body.type,
        price: req.body.price,
        date: req.body.date,
    };
    fuelPrices.push(newPrice);
    res.status(201).json(newPrice);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
