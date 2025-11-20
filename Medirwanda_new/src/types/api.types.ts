export interface User {
  id: number;
  uuid: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'PATIENT' | 'DOCTOR' | 'PHARMACIST' | 'DELIVERY_AGENT' | 'INSURER_ADMIN' | 'MOH_ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface Consultation {
  _id: string;
  patientId: User;
  doctorId: User;
  title: string;
  description?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduledAt?: string;
  notes?: string;
  prescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
