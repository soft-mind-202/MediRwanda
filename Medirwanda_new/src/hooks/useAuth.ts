import { useEffect } from 'react';
import { useAuthStore } from '@store/auth.store';
import { authService } from '@services/auth.service';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, setAccessToken } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token && !user) {
        try {
          const response = await authService.getCurrentUser();
          setUser(response.data);
          setAccessToken(token);
        } catch (error) {
          setAccessToken(null);
        }
      }
    };

    initAuth();
  }, []);

  return { user, isAuthenticated };
};
