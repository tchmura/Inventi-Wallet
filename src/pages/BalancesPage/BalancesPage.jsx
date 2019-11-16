import React from 'react';
import { useLocation } from 'react-router-dom';
import { MonthChart } from '../../components/Balances/MonthChart';
import { TotalBalance } from '../../components/Balances/TotalBalance';
import { StyledBalance } from '../../components/Balances/balancesStyles';

export const BalancesPage = () => {
  const location = useLocation();
  const { transactions } = location.state;

  return (
    <StyledBalance>
      <TotalBalance transactions={transactions} />
      <MonthChart transactions={transactions} />
    </StyledBalance>
  );
};
