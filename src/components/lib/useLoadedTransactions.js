import { useEffect, useState } from 'react';

export const useLoadedTransactions = defaultValue => {
  const [transactions, setTransactions] = useState(defaultValue);
  const loadTransactions = async () => {
    const response = await fetch('/transactions');
    const loadedTransactions = await response.json();
    setTransactions(loadedTransactions);
  };
  useEffect(() => {
    loadTransactions();
  }, []);
  return [transactions, setTransactions, loadTransactions];
};
