import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Import configurations
import { connectDatabase } from './config/database.js';
import { logger } from './services/logger.js';

// Import middleware
import { errorHandler } from './middleware/error.handler.js';
import { requestLogger } from './middleware/request-logger.middleware.js';

// Import routes
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import consultationRoutes from './modules/consultations/consultation.routes.js';
import patientRoutes from './modules/patients/patient.routes.js';
import doctorRoutes from './modules/doctors/doctor.routes.js';
import pharmacyRoutes from './modules/pharmacies/pharmacy.routes.js';
import prescriptionRoutes from './modules/prescriptions/prescription.routes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO for real-time features
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Constants
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_VERSION = 'v1';

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request Logger Middleware
app.use(requestLogger);

// Rate Limiting Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health check
    return req.path === '/health' || req.path === '/api/health';
  },
});

// Apply rate limiter to all routes except excluded
app.use((req, res, next) => {
  if (req.path === '/health' || req.path === '/api/health') {
    return next();
  }
  return limiter(req, res, next);
});

// ============================================================================
// ROUTES CONFIGURATION
// ============================================================================

// Health Check Routes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    version: API_VERSION,
    timestamp: new Date().toISOString(),
  });
});

// API v1 Routes
const apiV1 = express.Router();
apiV1.use('/auth', authRoutes);
apiV1.use('/users', userRoutes);
apiV1.use('/patients', patientRoutes);
apiV1.use('/doctors', doctorRoutes);
apiV1.use('/consultations', consultationRoutes);
apiV1.use('/prescriptions', prescriptionRoutes);
apiV1.use('/pharmacies', pharmacyRoutes);

// Mount API routes under /api
app.use('/api', apiV1);

// Root API info
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'MediRwanda API',
    version: API_VERSION,
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      consultations: '/api/consultations',
      health: '/api/health',
    },
  });
});

// ============================================================================
// SOCKET.IO CONFIGURATION
// ============================================================================

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`[Socket.IO] New client connected: ${socket.id}`);

  // Join user room for personalized messages
  socket.on('join_user', (userId) => {
    if (!userId) {
      logger.warn(`[Socket.IO] Invalid user ID for socket ${socket.id}`);
      return;
    }
    socket.join(`user_${userId}`);
    logger.info(`[Socket.IO] User ${userId} joined their room`);
    socket.emit('joined', { userId, socketId: socket.id });
  });

  // Consultation events
  socket.on('start_consultation', (data) => {
    logger.info(
      `[Socket.IO] Consultation started between patient ${data.patientId} and doctor ${data.doctorId}`
    );
    io.to(`user_${data.patientId}`)
      .to(`user_${data.doctorId}`)
      .emit('consultation_started', {
        ...data,
        startedAt: new Date().toISOString(),
      });
  });

  socket.on('end_consultation', (data) => {
    logger.info(
      `[Socket.IO] Consultation ended between patient ${data.patientId} and doctor ${data.doctorId}`
    );
    io.to(`user_${data.patientId}`)
      .to(`user_${data.doctorId}`)
      .emit('consultation_ended', {
        ...data,
        endedAt: new Date().toISOString(),
      });
  });

  // Messaging
  socket.on('send_message', (data) => {
    if (!data.recipientId) {
      logger.warn(`[Socket.IO] Invalid recipient ID for message from ${socket.id}`);
      return;
    }
    logger.info(
      `[Socket.IO] Message sent from ${data.senderId} to ${data.recipientId}`
    );
    io.to(`user_${data.recipientId}`).emit('receive_message', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  });

  // Typing indicator
  socket.on('typing', (data) => {
    io.to(`user_${data.recipientId}`).emit('user_typing', {
      senderId: data.senderId,
      isTyping: data.isTyping,
    });
  });

  // Vitals update
  socket.on('update_vitals', (data) => {
    logger.info(
      `[Socket.IO] Vitals updated by patient ${data.patientId}`
    );
    io.to(`user_${data.doctorId}`).emit('vitals_updated', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  });

  // Prescription updates
  socket.on('prescription_issued', (data) => {
    logger.info(
      `[Socket.IO] Prescription issued to patient ${data.patientId}`
    );
    io.to(`user_${data.patientId}`).emit('prescription_received', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  });

  // Notification events
  socket.on('notify_user', (data) => {
    logger.info(`[Socket.IO] Notification sent to user ${data.userId}`);
    io.to(`user_${data.userId}`).emit('notification', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  });

  // Disconnect handler
  socket.on('disconnect', () => {
    logger.info(`[Socket.IO] Client disconnected: ${socket.id}`);
  });

  // Error handler
  socket.on('error', (error) => {
    logger.error(`[Socket.IO] Error for ${socket.id}:`, error);
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 Handler - Must be before error handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// Global Error Handler - Must be last
app.use(errorHandler);

// ============================================================================
// SERVER INITIALIZATION & SHUTDOWN
// ============================================================================

const startServer = async () => {
  try {
    // Connect to database
    logger.info('🔗 Attempting to connect to database...');
    const { sequelize, models } = await connectDatabase();
    logger.info('✓ Database connected and models initialized');

    // Make models available globally
    global.db = { sequelize, models };

    // Start HTTP server
    server.listen(PORT, () => {
      logger.info(`✓ Server is running on port ${PORT}`);
      logger.info(`✓ Environment: ${NODE_ENV}`);
      logger.info(`✓ API URL: http://localhost:${PORT}/api`);
      logger.info(`✓ Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      logger.info(`✓ Socket.IO enabled for real-time features`);

      console.log('\n' + '='.repeat(60));
      console.log('🚀 MediRwanda Backend Server Started Successfully!');
      console.log('='.repeat(60));
      console.log(`   📍 API Server: http://localhost:${PORT}`);
      console.log(`   🏥 API Base:   http://localhost:${PORT}/api`);
      console.log(`   💚 Health:     http://localhost:${PORT}/health`);
      console.log(`   🔌 Socket.IO:  ws://localhost:${PORT}`);
      console.log(`   🌍 Frontend:   ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log('='.repeat(60) + '\n');
    });

    // Graceful shutdown handler
    const gracefulShutdown = async (signal) => {
      logger.info(`\n📍 ${signal} received, starting graceful shutdown...`);

      // Close HTTP server
      server.close(async () => {
        logger.info('✓ HTTP server closed');

        try {
          // Close database connection
          const { closeDatabase } = await import('./config/database.js');
          await closeDatabase();
          logger.info('✓ Database connection closed');
        } catch (error) {
          logger.error('✗ Error closing database:', error);
        }

        logger.info('✓ Graceful shutdown completed');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('✗ Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Handle signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('✗ Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('✗ Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

  } catch (error) {
    logger.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Export for testing or other modules
export { app, server, io };
