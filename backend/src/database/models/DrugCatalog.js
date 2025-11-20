import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const DrugCatalog = sequelize.define('DrugCatalog', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    drugCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'drug_code',
    },
    genericName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'generic_name',
    },
    brandName: {
      type: DataTypes.STRING(200),
      field: 'brand_name',
    },
    dosageForm: {
      type: DataTypes.ENUM('TABLET', 'CAPSULE', 'SYRUP', 'INJECTION', 'CREAM', 'INHALER', 'DROPS', 'OTHER'),
      allowNull: false,
      field: 'dosage_form',
    },
    strength: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING(100),
    },
    category: {
      type: DataTypes.STRING(100),
    },
    requiresPrescription: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'requires_prescription',
    },
    isControlledSubstance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_controlled_substance',
    },
    standardPrice: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'standard_price',
    },
    nhisCovered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'nhis_covered',
    },
    nhisCopayPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00,
      field: 'nhis_copay_percentage',
    },
    description: {
      type: DataTypes.TEXT,
    },
    sideEffects: {
      type: DataTypes.JSON,
      field: 'side_effects',
    },
    contraindications: {
      type: DataTypes.JSON,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  }, {
    tableName: 'drug_catalog',
    timestamps: true,
    underscored: true,
  });

  return DrugCatalog;
};
