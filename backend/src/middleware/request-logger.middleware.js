import { logger } from '../services/logger.js';

/**
 * Request Logger Middleware
 * Logs all incoming HTTP requests with their response status and duration
 */
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Log request details
  const requestLog = {
    method: req.method,
    path: req.path,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent'),
  };

  // Capture original send method
  const originalSend = res.send;

  // Override send method to log response
  res.send = function (data) {
    const duration = Date.now() - startTime;
    const responseLog = {
      ...requestLog,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    };

    // Log based on status code
    if (res.statusCode >= 500) {
      logger.error('SERVER ERROR', responseLog);
    } else if (res.statusCode >= 400) {
      logger.warn('CLIENT ERROR', responseLog);
    } else if (res.statusCode >= 300) {
      logger.debug('REDIRECT', responseLog);
    } else {
      logger.http('REQUEST', responseLog);
    }

    // Call original send
    res.send = originalSend;
    return res.send(data);
  };

  next();
};
