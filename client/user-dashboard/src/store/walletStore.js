import { create } from 'zustand';
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

const useWalletStore = create((set) => ({
  wallet: null,
  transactions: [],
  isLoading: false,
  error: null,

  getWallet: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.get('/wallet');
      set({ wallet: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch wallet', isLoading: false });
    }
  },

  deposit: async (amount, paymentMethod) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.post('/wallet/deposit', { amount, paymentMethod });
      set((state) => ({
        wallet: { ...state.wallet, balance: state.wallet.balance + amount },
        isLoading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Deposit failed', isLoading: false });
    }
  },

  withdraw: async (amount, bankDetails) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.post('/wallet/withdraw', { amount, bankDetails });
      set((state) => ({
        wallet: { ...state.wallet, balance: state.wallet.balance - amount },
        isLoading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Withdrawal failed', isLoading: false });
    }
  },

  getTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.get('/wallet/transactions');
      set({ transactions: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch transactions', isLoading: false });
    }
  },
}));

export default useWalletStore;
