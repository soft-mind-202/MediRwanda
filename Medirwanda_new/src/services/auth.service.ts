import api from '@lib/api';
import { User, AuthResponse } from '@types/api.types';

export const authService = {
  register: async (data: {
    firstName: string;
    lastName: string;
    nationalId: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    password: string;
    role?: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getCurrentUser: async (): Promise<{ success: boolean; data: User }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getUserProfile: async (userId: number): Promise<{ success: boolean; data: any }> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  getPatientProfile: async (userId: number): Promise<{ success: boolean; data: any }> => {
    const response = await api.get(`/patients/${userId}`);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
