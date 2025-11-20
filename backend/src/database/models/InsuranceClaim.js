import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const InsuranceClaim = sequelize.define('InsuranceClaim', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.CHAR(36),
      unique: true,
    },
    claimNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      field: 'claim_number',
    },
    prescriptionId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'prescription_id',
    },
    consultationId: {
      type: DataTypes.BIGINT.UNSIGNED,
      field: 'consultation_id',
    },
    patientId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'patient_id',
    },
    insurerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'insurer_id',
    },
    pharmacyId: {
      type: DataTypes.BIGINT.UNSIGNED,
      field: 'pharmacy_id',
    },
    claimType: {
      type: DataTypes.ENUM('CONSULTATION', 'PRESCRIPTION', 'BOTH'),
      allowNull: false,
      field: 'claim_type',
    },
    totalClaimedAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'total_claimed_amount',
    },
    approvedAmount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
      field: 'approved_amount',
    },
    rejectedAmount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
      field: 'rejected_amount',
    },
    patientCopay: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'patient_copay',
    },
    status: {
      type: DataTypes.ENUM('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PARTIALLY_APPROVED', 'REJECTED', 'PAID'),
      defaultValue: 'DRAFT',
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      field: 'rejection_reason',
    },
    submittedAt: {
      type: DataTypes.DATE,
      field: 'submitted_at',
    },
    reviewedAt: {
      type: DataTypes.DATE,
      field: 'reviewed_at',
    },
    approvedAt: {
      type: DataTypes.DATE,
      field: 'approved_at',
    },
    paidAt: {
      type: DataTypes.DATE,
      field: 'paid_at',
    },
    paymentReference: {
      type: DataTypes.STRING(50),
      field: 'payment_reference',
    },
    reviewerNotes: {
      type: DataTypes.TEXT,
      field: 'reviewer_notes',
    },
    supportingDocuments: {
      type: DataTypes.JSON,
      field: 'supporting_documents',
    },
  }, {
    tableName: 'insurance_claims',
    timestamps: true,
    underscored: true,
  });

  return InsuranceClaim;
};
