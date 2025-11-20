import express from 'express';
import { register, login } from './auth.service.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { firstName, lastName, nationalId, email, phone, dateOfBirth, gender, password, role } = req.body;

    if (!firstName || !lastName || !nationalId || !email || !phone || !dateOfBirth || !gender || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: firstName, lastName, nationalId, email, phone, dateOfBirth, gender, password',
      });
    }

    const result = await register({
      firstName,
      lastName,
      nationalId,
      email,
      phone,
      dateOfBirth,
      gender,
      password,
      role: role || 'PATIENT',
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const result = await login(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
