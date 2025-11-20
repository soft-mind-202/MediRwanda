import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize) => {
  const Patient = sequelize.define('Patient', {
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      field: 'user_id',
    },
    nhisMemberId: {
      type: DataTypes.STRING(20),
      unique: true,
      field: 'nhis_member_id',
    },
    nhisCategory: {
      type: DataTypes.TINYINT,
      field: 'nhis_category',
    },
    nhisExpiryDate: {
      type: DataTypes.DATE,
      field: 'nhis_expiry_date',
    },
    primaryInsurerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      field: 'primary_insurer_id',
    },
    secondaryInsurerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      field: 'secondary_insurer_id',
    },
    bloodType: {
      type: DataTypes.STRING(3),
      field: 'blood_type',
    },
    bloodGroup: {
      type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
      field: 'blood_group',
    },
    heightCm: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'height_cm',
    },
    weightKg: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'weight_kg',
    },
    allergies: {
      type: DataTypes.JSON,
      field: 'allergies',
    },
    chronicConditions: {
      type: DataTypes.JSON,
      field: 'chronic_conditions',
    },
    emergencyContactName: {
      type: DataTypes.STRING(100),
      field: 'emergency_contact_name',
    },
    emergencyContactPhone: {
      type: DataTypes.STRING(15),
      field: 'emergency_contact_phone',
    },
    emergencyContactRelation: {
      type: DataTypes.STRING(50),
      field: 'emergency_contact_relation',
    },
    preferredLanguage: {
      type: DataTypes.ENUM('KINYARWANDA', 'ENGLISH', 'FRENCH', 'SWAHILI'),
      defaultValue: 'KINYARWANDA',
      field: 'preferred_language',
    },
  }, {
    tableName: 'patients',
    timestamps: false,
    underscored: true,
  });

  return Patient;
};
