import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Doctor = sequelize.define('Doctor', {
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      field: 'user_id',
    },
    licenseNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'license_number',
    },
    licenseExpiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'license_expiry_date',
    },
    specialty: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subSpecialty: {
      type: DataTypes.STRING(100),
      field: 'sub_specialty',
    },
    qualification: {
      type: DataTypes.TEXT,
      field: 'qualification',
    },
    yearsOfExperience: {
      type: DataTypes.TINYINT,
      field: 'years_of_experience',
    },
    hospitalAffiliation: {
      type: DataTypes.STRING(100),
      field: 'hospital_affiliation',
    },
    consultationFee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 5000.00,
      field: 'consultation_fee',
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_online',
    },
    isAcceptingPatients: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_accepting_patients',
    },
    averageRating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0.00,
      field: 'average_rating',
    },
    totalReviews: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      field: 'total_reviews',
    },
    totalConsultations: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      field: 'total_consultations',
    },
    bio: {
      type: DataTypes.TEXT,
      field: 'bio',
    },
    languagesSpoken: {
      type: DataTypes.JSON,
      field: 'languages_spoken',
    },
    availabilitySchedule: {
      type: DataTypes.JSON,
      field: 'availability_schedule',
    },
  }, {
    tableName: 'doctors',
    timestamps: false,
    underscored: true,
  });

  return Doctor;
};
