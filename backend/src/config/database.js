import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { logger } from '../services/logger.js';
import initializeModels from '../database/models/index.js';

dotenv.config();

let sequelize = null;

export const connectDatabase = async () => {
  try {
    sequelize = new Sequelize({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'medirwanda',
      dialect: 'mysql',
      logging: (sql) => {
        if (process.env.NODE_ENV === 'development') {
          logger.debug('SQL:', sql);
        }
      },
      pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: true,
        underscored: true,
      },
    });

    // Test the connection
    await sequelize.authenticate();
    logger.info('Database connection established successfully');

    // Initialize all models with associations
    const models = initializeModels(sequelize);

    // Sync database (creates tables if they don't exist)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('Database schema synchronized');
    }

    logger.info('All database models initialized');
    return { sequelize, models };
  } catch (error) {
    logger.error('Database connection failed:', error.message);
    throw error;
  }
};

export const closeDatabase = async () => {
  if (sequelize) {
    await sequelize.close();
    logger.info('Database connection closed');
  }
};

export const getSequelize = () => sequelize;

export default sequelize;
