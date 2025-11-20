import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import User from '../users/user.model.js';

const Consultation = sequelize.define('Consultation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'in-progress', 'completed', 'cancelled'),
    defaultValue: 'scheduled',
  },
  scheduledAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Define associations
Consultation.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
Consultation.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });

export default Consultation;
