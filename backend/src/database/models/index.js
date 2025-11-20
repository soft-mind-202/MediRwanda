import UserModel from './User.js';
import PatientModel from './Patient.js';
import DoctorModel from './Doctor.js';
import ConsultationModel from './Consultation.js';
import PrescriptionModel from './Prescription.js';
import ConsultationVitalsModel from './ConsultationVitals.js';
import PharmacyModel from './Pharmacy.js';
import DrugCatalogModel from './DrugCatalog.js';
import InsurerModel from './Insurer.js';
import InsuranceClaimModel from './InsuranceClaim.js';

export const initializeModels = (sequelize) => {
  const User = UserModel(sequelize);
  const Patient = PatientModel(sequelize);
  const Doctor = DoctorModel(sequelize);
  const Consultation = ConsultationModel(sequelize);
  const Prescription = PrescriptionModel(sequelize);
  const ConsultationVitals = ConsultationVitalsModel(sequelize);
  const Pharmacy = PharmacyModel(sequelize);
  const DrugCatalog = DrugCatalogModel(sequelize);
  const Insurer = InsurerModel(sequelize);
  const InsuranceClaim = InsuranceClaimModel(sequelize);

  // Patient - User Association
  Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasOne(Patient, { foreignKey: 'userId', as: 'patientProfile' });

  // Doctor - User Association
  Doctor.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasOne(Doctor, { foreignKey: 'userId', as: 'doctorProfile' });

  // Consultation Associations
  Consultation.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });
  Consultation.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });
  User.hasMany(Consultation, { foreignKey: 'patientId', as: 'consultationsAsPatient' });
  User.hasMany(Consultation, { foreignKey: 'doctorId', as: 'consultationsAsDoctor' });

  // Consultation Vitals Association
  ConsultationVitals.belongsTo(Consultation, { foreignKey: 'consultationId', as: 'consultation' });
  Consultation.hasMany(ConsultationVitals, { foreignKey: 'consultationId', as: 'vitals' });

  // Prescription Associations
  Prescription.belongsTo(Consultation, { foreignKey: 'consultationId', as: 'consultation' });
  Prescription.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });
  Prescription.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });
  Prescription.belongsTo(Pharmacy, { foreignKey: 'pharmacyId', as: 'pharmacy', allowNull: true });

  Consultation.hasMany(Prescription, { foreignKey: 'consultationId', as: 'prescriptions' });
  User.hasMany(Prescription, { foreignKey: 'patientId', as: 'prescriptionsAsPatient' });
  User.hasMany(Prescription, { foreignKey: 'doctorId', as: 'prescriptionsAsDoctor' });
  Pharmacy.hasMany(Prescription, { foreignKey: 'pharmacyId', as: 'prescriptions' });

  // Pharmacy Associations
  Pharmacy.belongsTo(User, { foreignKey: 'ownerId', as: 'owner', allowNull: true });
  User.hasMany(Pharmacy, { foreignKey: 'ownerId', as: 'ownedPharmacies' });

  // Insurance Claim Associations
  InsuranceClaim.belongsTo(Prescription, { foreignKey: 'prescriptionId', as: 'prescription' });
  InsuranceClaim.belongsTo(Consultation, { foreignKey: 'consultationId', as: 'consultation', allowNull: true });
  InsuranceClaim.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });
  InsuranceClaim.belongsTo(Insurer, { foreignKey: 'insurerId', as: 'insurer' });
  InsuranceClaim.belongsTo(Pharmacy, { foreignKey: 'pharmacyId', as: 'pharmacy', allowNull: true });

  Prescription.hasOne(InsuranceClaim, { foreignKey: 'prescriptionId', as: 'claim' });
  Consultation.hasMany(InsuranceClaim, { foreignKey: 'consultationId', as: 'claims' });
  User.hasMany(InsuranceClaim, { foreignKey: 'patientId', as: 'claims' });
  Insurer.hasMany(InsuranceClaim, { foreignKey: 'insurerId', as: 'claims' });

  // Patient - Insurer Associations
  Patient.belongsTo(Insurer, { foreignKey: 'primaryInsurerId', as: 'primaryInsurer', allowNull: true });
  Patient.belongsTo(Insurer, { foreignKey: 'secondaryInsurerId', as: 'secondaryInsurer', allowNull: true });

  return {
    User,
    Patient,
    Doctor,
    Consultation,
    Prescription,
    ConsultationVitals,
    Pharmacy,
    DrugCatalog,
    Insurer,
    InsuranceClaim,
  };
};

export default initializeModels;
