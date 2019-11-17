import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MonthChart } from '../../components/Balances/MonthChart';
import { TotalBalance } from '../../components/Balances/TotalBalance';
import { StyledBalance } from '../../components/Balances/balancesStyles';
import { DailyBalance } from '../../components/Balances/DailyBalance';
import { StyledButton } from '../../components/shared/StyledButton';

export const BalancesPage = () => {
  const [transactions, setTransactions] = useState(null);
  const history = useHistory();
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
      <>
        <StyledButton onClick={history.goBack}>Back</StyledButton>
        <StyledBalance>
          <TotalBalance transactions={transactions} />
          <DailyBalance transactions={transactions} />
          <MonthChart transactions={transactions} />
        </StyledBalance>
      </>
    )
  );
};
