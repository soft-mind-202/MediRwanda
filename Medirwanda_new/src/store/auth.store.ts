import { create } from 'zustand';
import { User } from '@types/api.types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: localStorage.getItem('accessToken'),
  
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  setAccessToken: (token) => {
    set({ accessToken: token, isAuthenticated: !!token });
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, accessToken: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
}));
