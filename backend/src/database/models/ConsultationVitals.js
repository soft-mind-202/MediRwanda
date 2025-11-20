import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ConsultationVitals = sequelize.define('ConsultationVitals', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    consultationId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'consultation_id',
    },
    bloodPressureSystolic: {
      type: DataTypes.INTEGER,
      field: 'blood_pressure_systolic',
    },
    bloodPressureDiastolic: {
      type: DataTypes.INTEGER,
      field: 'blood_pressure_diastolic',
    },
    heartRate: {
      type: DataTypes.INTEGER,
      field: 'heart_rate',
    },
    temperature: {
      type: DataTypes.DECIMAL(4, 1),
      field: 'temperature',
    },
    oxygenSaturation: {
      type: DataTypes.INTEGER,
      field: 'oxygen_saturation',
    },
    respiratoryRate: {
      type: DataTypes.INTEGER,
      field: 'respiratory_rate',
    },
    weightKg: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'weight_kg',
    },
    heightCm: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'height_cm',
    },
    bmi: {
      type: DataTypes.DECIMAL(4, 2),
      field: 'bmi',
    },
    recordedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'recorded_at',
    },
  }, {
    tableName: 'consultation_vitals',
    timestamps: false,
    underscored: true,
  });

  return ConsultationVitals;
};
