import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize) => {
  const Consultation = sequelize.define('Consultation', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.CHAR(36),
      defaultValue: () => uuidv4(),
      unique: true,
    },
    patientId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'patient_id',
    },
    doctorId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'doctor_id',
    },
    consultationType: {
      type: DataTypes.ENUM('VIDEO', 'AUDIO', 'CHAT', 'EMERGENCY'),
      defaultValue: 'VIDEO',
      field: 'consultation_type',
    },
    status: {
      type: DataTypes.ENUM('SCHEDULED', 'WAITING', 'ONGOING', 'COMPLETED', 'CANCELLED', 'NO_SHOW'),
      defaultValue: 'WAITING',
    },
    chiefComplaint: {
      type: DataTypes.TEXT,
      field: 'chief_complaint',
    },
    diagnosis: {
      type: DataTypes.TEXT,
    },
    doctorNotes: {
      type: DataTypes.TEXT,
      field: 'doctor_notes',
    },
    consultationFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'consultation_fee',
    },
    patientCopay: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      field: 'patient_copay',
    },
    insuranceCoverage: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      field: 'insurance_coverage',
    },
    scheduledAt: {
      type: DataTypes.DATE,
      field: 'scheduled_at',
    },
    startedAt: {
      type: DataTypes.DATE,
      field: 'started_at',
    },
    endedAt: {
      type: DataTypes.DATE,
      field: 'ended_at',
    },
    durationMinutes: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: 'duration_minutes',
    },
    patientRating: {
      type: DataTypes.TINYINT,
      field: 'patient_rating',
    },
    patientFeedback: {
      type: DataTypes.TEXT,
      field: 'patient_feedback',
    },
    webrtcSessionId: {
      type: DataTypes.STRING(100),
      field: 'webrtc_session_id',
    },
    recordingUrl: {
      type: DataTypes.STRING(255),
      field: 'recording_url',
    },
    recordingConsent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'recording_consent',
    },
    followUpRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'follow_up_required',
    },
    followUpDate: {
      type: DataTypes.DATE,
      field: 'follow_up_date',
    },
  }, {
    tableName: 'consultations',
    timestamps: true,
    underscored: true,
  });

  return Consultation;
};
