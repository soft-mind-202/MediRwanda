import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize) => {
  const User = sequelize.define('User', {
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
    nationalId: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
      field: 'national_id',
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: { isEmail: true },
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'full_name',
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date_of_birth',
    },
    gender: {
      type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('PATIENT', 'DOCTOR', 'PHARMACIST', 'DELIVERY_AGENT', 'INSURER_ADMIN', 'MOH_ADMIN', 'SUPER_ADMIN'),
      defaultValue: 'PATIENT',
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_verified',
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      field: 'email_verified_at',
    },
    phoneVerifiedAt: {
      type: DataTypes.DATE,
      field: 'phone_verified_at',
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      field: 'last_login_at',
    },
    lastLoginIp: {
      type: DataTypes.STRING(45),
      field: 'last_login_ip',
    },
    failedLoginAttempts: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      field: 'failed_login_attempts',
    },
    lockedUntil: {
      type: DataTypes.DATE,
      field: 'locked_until',
    },
    twoFactorSecret: {
      type: DataTypes.STRING(32),
      field: 'two_factor_secret',
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'two_factor_enabled',
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.passwordHash) {
          user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('passwordHash')) {
          user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
        }
      },
    },
  });

  User.prototype.comparePassword = async function(password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  User.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.passwordHash;
    return values;
  };

  return User;
};
