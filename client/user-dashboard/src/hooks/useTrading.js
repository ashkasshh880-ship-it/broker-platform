import useTradingStore from '../store/tradingStore';

const useTrading = () => {
  const { portfolio, orders, marketData, isLoading, error, getPortfolio, buyOrder, sellOrder, getOrders, getMarketData } = useTradingStore();

  return {
    portfolio,
    orders,
    marketData,
    isLoading,
    error,
    getPortfolio,
    buyOrder,
    sellOrder,
    getOrders,
    getMarketData,
  };
};

export default useTrading;
