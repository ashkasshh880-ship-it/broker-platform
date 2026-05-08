import useAuthStore from '../store/authStore';

const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, error, login, logout, register, getCurrentUser } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    getCurrentUser,
  };
};

export default useAuth;
