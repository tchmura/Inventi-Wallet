import React from 'react';
import { useLocation } from 'react-router-dom';
import { MonthChart } from './MonthChart';
import { TotalBalance } from './TotalBalance';
import { StyledBalance } from './balancesStyles';

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
