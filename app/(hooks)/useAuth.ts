//Create a shallow hook for convenience
import { useAuthStore } from '@/app/store/useAuthStore';

export const useAuth = () => {
  const { user, accessToken, refreshToken, isAuthenticated, logout } = useAuthStore();

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading: false, // persist 會自動 hydrate
    logout,
  };
};