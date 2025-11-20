import express from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { logger } from '../../services/logger.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { models } = global.db;
    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'MOH_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required',
      });
    }

    const users = await models.User.findAll({
      attributes: { exclude: ['passwordHash'] },
      order: [['createdAt', 'DESC']],
    });
    
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { models } = global.db;
    const user = await models.User.findByPk(req.params.id, {
      attributes: { exclude: ['passwordHash'] },
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const { models } = global.db;
    const user = await models.User.findByPk(req.user.id, {
      attributes: { exclude: ['passwordHash'] },
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update user
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { models } = global.db;
    if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only update your own profile',
      });
    }

    const updates = req.body;
    delete updates.passwordHash;
    delete updates.email;
    delete updates.nationalId;

    const user = await models.User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await user.update(updates);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
});

// Delete user (soft delete)
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { models } = global.db;
    if (req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required',
      });
    }

    const user = await models.User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
