import React, { useState, useEffect } from 'react';
import { MonthChart } from '../../components/Balances/MonthChart';
import { TotalBalance } from '../../components/Balances/TotalBalance';
import { StyledBalance } from '../../components/Balances/balancesStyles';
import { DailyBalance } from '../../components/Balances/DailyBalance';

export const BalancesPage = () => {
  const [transactions, setTransactions] = useState(null);
  const loadTransactions = () => {
    fetch('/transactions')
      .then(res => res.json())
      .then(response => setTransactions(response));
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    transactions && (
      <StyledBalance>
        <TotalBalance transactions={transactions} />
        <DailyBalance transactions={transactions} />
        <MonthChart transactions={transactions} />
      </StyledBalance>
    )
  );
};
