import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Pharmacy = sequelize.define('Pharmacy', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    ownerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      field: 'owner_id',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    licenseNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      field: 'license_number',
    },
    licenseExpiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'license_expiry_date',
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.TEXT,
      field: 'street_address',
    },
    is24Hours: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_24_hours',
    },
    openingTime: {
      type: DataTypes.TIME,
      field: 'opening_time',
    },
    closingTime: {
      type: DataTypes.TIME,
      field: 'closing_time',
    },
    acceptsDelivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'accepts_delivery',
    },
    acceptsInsurance: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'accepts_insurance',
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
    totalOrders: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      field: 'total_orders',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  }, {
    tableName: 'pharmacies',
    timestamps: true,
    underscored: true,
  });

  return Pharmacy;
};
