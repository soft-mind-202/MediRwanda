import express from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

// GET all patients or filtered by role
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    const patients = await models.Patient.findAll({
      include: [{ model: models.User, as: 'user', attributes: { exclude: ['passwordHash'] } }],
      attributes: { exclude: ['userId'] },
    });
    res.json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single patient
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    const patient = await models.Patient.findByPk(req.params.id, {
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['passwordHash'] } },
        { model: models.Insurer, as: 'primaryInsurer' },
        { model: models.Insurer, as: 'secondaryInsurer' },
      ],
    });
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE patient
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { models } = global.db;
    const patient = await models.Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    await patient.update(req.body);
    res.json({ success: true, message: 'Patient updated', data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
