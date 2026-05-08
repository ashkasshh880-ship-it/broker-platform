import { create } from 'zustand';
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

const useTradingStore = create((set) => ({
  portfolio: null,
  orders: [],
  marketData: [],
  isLoading: false,
  error: null,

  getPortfolio: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.get('/trading/portfolio');
      set({ portfolio: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch portfolio', isLoading: false });
    }
  },

  buyOrder: async (symbol, quantity, price) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.post('/trading/buy', { symbol, quantity, price });
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Buy order failed', isLoading: false });
    }
  },

  sellOrder: async (symbol, quantity, price) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.post('/trading/sell', { symbol, quantity, price });
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Sell order failed', isLoading: false });
    }
  },

  getOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.get('/trading/orders');
      set({ orders: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch orders', isLoading: false });
    }
  },

  getMarketData: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await API.get('/trading/market-data');
      set({ marketData: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch market data', isLoading: false });
    }
  },
}));

export default useTradingStore;
