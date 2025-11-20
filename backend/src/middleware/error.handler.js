import { logger } from '../services/logger.js';

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(status).json({
    success: false,
    status,
    message,
    timestamp: new Date().toISOString(),
  });
};
