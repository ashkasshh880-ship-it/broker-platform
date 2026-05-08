import useWalletStore from '../store/walletStore';

const useWallet = () => {
  const { wallet, transactions, isLoading, error, getWallet, deposit, withdraw, getTransactions } = useWalletStore();

  return {
    wallet,
    transactions,
    isLoading,
    error,
    getWallet,
    deposit,
    withdraw,
    getTransactions,
  };
};

export default useWallet;
