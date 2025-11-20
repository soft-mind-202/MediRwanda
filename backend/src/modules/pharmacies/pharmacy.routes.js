import express from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { logger } from '../../services/logger.js';

const router = express.Router();

// GET all pharmacies
router.get('/', async (req, res) => {
  try {
    const { models } = global.db;
    const { district, isActive, accepts24Hours } = req.query;
    const where = {};

    if (district) where.district = district;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (accepts24Hours !== undefined) where.is24Hours = accepts24Hours === 'true';

    const pharmacies = await models.Pharmacy.findAll({
      where,
      include: [{ model: models.User, as: 'owner', attributes: { exclude: ['passwordHash'] } }],
      order: [['averageRating', 'DESC']],
    });
    res.json({ success: true, data: pharmacies });
  } catch (error) {
    logger.error('Error fetching pharmacies:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single pharmacy
router.get('/:id', async (req, res) => {
  try {
    const { models } = global.db;
    const pharmacy = await models.Pharmacy.findByPk(req.params.id, {
      include: [
        { model: models.User, as: 'owner', attributes: { exclude: ['passwordHash'] } },
        { model: models.Prescription, as: 'prescriptions', limit: 10 },
      ],
    });
    if (!pharmacy) {
      return res.status(404).json({ success: false, message: 'Pharmacy not found' });
    }
    res.json({ success: true, data: pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE pharmacy
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'MOH_ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    const pharmacy = await models.Pharmacy.create(req.body);
    res.status(201).json({ success: true, message: 'Pharmacy created', data: pharmacy });
  } catch (error) {
    logger.error('Error creating pharmacy:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE pharmacy
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    const pharmacy = await models.Pharmacy.findByPk(req.params.id);
    if (!pharmacy) {
      return res.status(404).json({ success: false, message: 'Pharmacy not found' });
    }
    if (req.user.id !== pharmacy.ownerId && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    await pharmacy.update(req.body);
    res.json({ success: true, message: 'Pharmacy updated', data: pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
