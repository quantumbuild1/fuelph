const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const env = require('./config/env');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security & Compression
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(compression());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/fuel', require('./routes/fuel'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stations', require('./routes/stations'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
