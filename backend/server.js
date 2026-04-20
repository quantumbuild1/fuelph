const app = require('./src/app');
const sequelize = require('./src/config/database');
const env = require('./src/config/env');
const logger = require('./src/middleware/logger');

const startServer = async () => {
  try {
    // Sync database
    await sequelize.sync();
    logger.info('✅ Database synced');

    // Start server
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running on port ${env.PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
