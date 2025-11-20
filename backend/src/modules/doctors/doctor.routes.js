import express from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

// GET all doctors
router.get('/', async (req, res) => {
  try {
    const { models } = global.db;
    const { specialty, isOnline, isAcceptingPatients } = req.query;
    const where = {};

    if (specialty) where.specialty = specialty;
    if (isOnline !== undefined) where.isOnline = isOnline === 'true';
    if (isAcceptingPatients !== undefined) where.isAcceptingPatients = isAcceptingPatients === 'true';

    const doctors = await models.Doctor.findAll({
      where,
      include: [{ model: models.User, as: 'user', attributes: { exclude: ['passwordHash'] } }],
      order: [['averageRating', 'DESC']],
    });
    res.json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single doctor
router.get('/:id', async (req, res) => {
  try {
    const { models } = global.db;
    const doctor = await models.Doctor.findByPk(req.params.id, {
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['passwordHash'] } },
        { model: models.Consultation, as: 'consultations', limit: 5, order: [['createdAt', 'DESC']] },
      ],
    });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE doctor profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    const doctor = await models.Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    await doctor.update(req.body);
    res.json({ success: true, message: 'Doctor profile updated', data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
