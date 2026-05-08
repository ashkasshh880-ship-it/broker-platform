import { create } from 'zustand';
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  setToken: (token) => {
    localStorage.setItem('token', token);
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    set({ token, isAuthenticated: true });
  },

  register: async (email, password, fullName) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.post('/auth/register', { email, password, fullName });
      get().setToken(data.token);
      set({ user: data.user, isLoading: false });
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.post('/auth/login', { email, password });
      get().setToken(data.token);
      set({ user: data.user, isLoading: false });
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
    set({ user: null, token: null, isAuthenticated: false });
  },

  getCurrentUser: async () => {
    if (!get().token) return null;
    set({ isLoading: true });
    try {
      const { data } = await API.get('/auth/me');
      set({ user: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false });
      get().logout();
      return null;
    }
  },
}));

export default useAuthStore;
