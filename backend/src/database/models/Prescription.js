import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize) => {
  const Prescription = sequelize.define('Prescription', {
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
    consultationId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'consultation_id',
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
    prescriptionNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      field: 'prescription_number',
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'PHARMACY_ACCEPTED', 'PREPARING', 'DISPENSED', 'DELIVERED', 'CANCELLED', 'EXPIRED'),
      defaultValue: 'PENDING',
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      field: 'total_amount',
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
    issuedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'issued_at',
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at',
    },
    filledAt: {
      type: DataTypes.DATE,
      field: 'filled_at',
    },
    pharmacyId: {
      type: DataTypes.BIGINT.UNSIGNED,
      field: 'pharmacy_id',
    },
    pharmacistId: {
      type: DataTypes.BIGINT.UNSIGNED,
      field: 'pharmacist_id',
    },
    doctorSignature: {
      type: DataTypes.BLOB,
      field: 'doctor_signature',
    },
    qrCode: {
      type: DataTypes.BLOB,
      field: 'qr_code',
    },
    specialInstructions: {
      type: DataTypes.TEXT,
      field: 'special_instructions',
    },
    isRenewable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_renewable',
    },
    renewalsAllowed: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      field: 'renewals_allowed',
    },
    timesRenewed: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      field: 'times_renewed',
    },
    ref: {
      type: DataTypes.STRING(60),
      unique: true,
    },
  }, {
    tableName: 'prescriptions',
    timestamps: false,
    underscored: true,
  });

  return Prescription;
};
