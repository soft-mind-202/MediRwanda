import jwt from 'jsonwebtoken';
import { logger } from '../../services/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d';

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role, uuid: user.uuid },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
    { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d' }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token, secret = JWT_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    logger.error('Token verification error:', error);
    return null;
  }
};

export const register = async (userData) => {
  try {
    const { models } = global.db;
    const {
      firstName,
      lastName,
      nationalId,
      phone,
      email,
      dateOfBirth,
      gender,
      password,
      role = 'PATIENT',
    } = userData;

    // Handle field mapping for fullName
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : userData.fullName;

    // Validate required fields
    if (!fullName || !nationalId || !phone || !email || !dateOfBirth || !gender || !password) {
      throw new Error('Missing required fields');
    }

    // Check if user already exists
    const existingUser = await models.User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const existingPhone = await models.User.findOne({
      where: { phone },
    });

    if (existingPhone) {
      throw new Error('Phone number already registered');
    }

    const existingNationalId = await models.User.findOne({
      where: { nationalId },
    });

    if (existingNationalId) {
      throw new Error('National ID already registered');
    }

    // Ensure phone starts with +250
    const formattedPhone = phone.startsWith('+250') ? phone : `+250${phone.replace(/^0+/, '')}`;

    // Create new user
    const user = await models.User.create({
      fullName,
      nationalId,
      phone: formattedPhone,
      email,
      dateOfBirth: new Date(dateOfBirth),
      gender: gender.toUpperCase(),
      passwordHash: password, // Will be hashed by the model hook
      role: role.toUpperCase(),
      isVerified: false,
      isActive: true,
    });

    logger.info(`New user registered: ${user.email} with role ${role}`);

    // Create role-specific profile
    if (role === 'PATIENT') {
      await models.Patient.create({
        userId: user.id,
        preferredLanguage: 'KINYARWANDA',
      });
    } else if (role === 'DOCTOR') {
      await models.Doctor.create({
        userId: user.id,
        licenseNumber: '',
        licenseExpiryDate: new Date(),
        specialty: '',
        consultationFee: 0,
        isOnline: false,
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    return {
      user: {
        id: user.id,
        uuid: user.uuid,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error('Registration error:', error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const { models } = global.db;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await models.User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is inactive');
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await user.update({
      lastLoginAt: new Date(),
      lastLoginIp: null, // Can be set from request if needed
      failedLoginAttempts: 0,
    });

    logger.info(`User logged in: ${user.email}`);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    return {
      user: {
        id: user.id,
        uuid: user.uuid,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        lastLoginAt: user.lastLoginAt,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error('Login error:', error.message);
    throw error;
  }
};
