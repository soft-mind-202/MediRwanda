import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Insurer = sequelize.define('Insurer', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    insurerType: {
      type: DataTypes.ENUM('NHIS', 'RSSB', 'PRIVATE', 'MILITARY'),
      allowNull: false,
      field: 'insurer_type',
    },
    contactEmail: {
      type: DataTypes.STRING(100),
      field: 'contact_email',
    },
    contactPhone: {
      type: DataTypes.STRING(15),
      field: 'contact_phone',
    },
    apiEndpoint: {
      type: DataTypes.STRING(255),
      field: 'api_endpoint',
    },
    apiKeyEncrypted: {
      type: DataTypes.STRING(255),
      field: 'api_key_encrypted',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  }, {
    tableName: 'insurers',
    timestamps: true,
    underscored: true,
  });

  return Insurer;
};
