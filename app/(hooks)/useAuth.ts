//Create a shallow hook for convenience
import { useAuthStore } from '@/app/store/useAuthStore';

export const useAuth = () => {
  const { user, refreshToken, isAuthenticated, logout } = useAuthStore();

  return {
    user,
    refreshToken,
    isAuthenticated,
    isLoading: false, // persist 會自動 hydrate
    logout,
  };
};