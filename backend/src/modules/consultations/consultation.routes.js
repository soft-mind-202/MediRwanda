import express from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { logger } from '../../services/logger.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create consultation
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { models } = global.db;
    const {
      doctorId,
      consultationType = 'VIDEO',
      chiefComplaint,
      consultationFee,
      scheduledAt,
    } = req.body;

    if (!doctorId || !consultationFee) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const consultation = await models.Consultation.create({
      patientId: req.user.id,
      doctorId,
      consultationType,
      chiefComplaint,
      consultationFee,
      scheduledAt,
      status: 'SCHEDULED',
    });

    res.status(201).json({
      success: true,
      message: 'Consultation created successfully',
      data: consultation,
    });
  } catch (error) {
    logger.error('Error creating consultation:', error);
    next(error);
  }
});

// Get all consultations (filtered by role)
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { models } = global.db;
    const { status } = req.query;
    let where = {};

    if (req.user.role === 'PATIENT') {
      where.patientId = req.user.id;
    } else if (req.user.role === 'DOCTOR') {
      where.doctorId = req.user.id;
    }

    if (status) where.status = status;

    const consultations = await models.Consultation.findAll({
      where,
      include: [
        {
          model: models.User,
          as: 'patient',
          attributes: { exclude: ['passwordHash'] },
        },
        {
          model: models.User,
          as: 'doctor',
          attributes: { exclude: ['passwordHash'] },
        },
        { model: models.ConsultationVitals, as: 'vitals' },
      ],
      order: [['scheduledAt', 'DESC']],
    });

    res.json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    logger.error('Error fetching consultations:', error);
    next(error);
  }
});

// Get consultation by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { models } = global.db;
    const consultation = await models.Consultation.findByPk(req.params.id, {
      include: [
        {
          model: models.User,
          as: 'patient',
          attributes: { exclude: ['passwordHash'] },
        },
        {
          model: models.User,
          as: 'doctor',
          attributes: { exclude: ['passwordHash'] },
        },
        { model: models.ConsultationVitals, as: 'vitals' },
        { model: models.Prescription, as: 'prescriptions' },
      ],
    });

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found',
      });
    }

    res.json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
});

// Update consultation
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found',
      });
    }

    // Only doctor or admin can update
    if (req.user.id !== consultation.doctorId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only update your own consultations',
      });
    }

    const updates = req.body;
    await consultation.update(updates);

    res.json({
      success: true,
      message: 'Consultation updated successfully',
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
