import express from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { logger } from '../../services/logger.js';

const router = express.Router();

// GET all prescriptions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    const { status, patientId } = req.query;
    const where = {};

    if (status) where.status = status;
    if (patientId) where.patientId = patientId;

    const prescriptions = await models.Prescription.findAll({
      where,
      include: [
        { model: models.User, as: 'patient', attributes: { exclude: ['passwordHash'] } },
        { model: models.User, as: 'doctor', attributes: { exclude: ['passwordHash'] } },
        { model: models.Pharmacy, as: 'pharmacy' },
      ],
      order: [['issuedAt', 'DESC']],
    });
    res.json({ success: true, data: prescriptions });
  } catch (error) {
    logger.error('Error fetching prescriptions:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single prescription
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    const prescription = await models.Prescription.findByPk(req.params.id, {
      include: [
        { model: models.Consultation, as: 'consultation' },
        { model: models.User, as: 'patient', attributes: { exclude: ['passwordHash'] } },
        { model: models.User, as: 'doctor', attributes: { exclude: ['passwordHash'] } },
        { model: models.Pharmacy, as: 'pharmacy' },
      ],
    });
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }
    res.json({ success: true, data: prescription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE prescription
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    if (req.user.role !== 'DOCTOR') {
      return res.status(403).json({ success: false, message: 'Only doctors can issue prescriptions' });
    }
    const prescription = await models.Prescription.create({
      ...req.body,
      doctorId: req.user.id,
      prescriptionNumber: `RX-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.random().toString(36).substring(7)}`,
    });
    res.status(201).json({ success: true, message: 'Prescription created', data: prescription });
  } catch (error) {
    logger.error('Error creating prescription:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE prescription
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    const prescription = await models.Prescription.findByPk(req.params.id);
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }
    if (req.user.id !== prescription.doctorId && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    await prescription.update(req.body);
    res.json({ success: true, message: 'Prescription updated', data: prescription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
