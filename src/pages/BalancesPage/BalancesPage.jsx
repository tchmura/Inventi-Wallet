import React from 'react';
import { useHistory } from 'react-router-dom';
import { MonthChart } from '../../components/Balances/MonthChart';
import { TotalBalance } from '../../components/Balances/TotalBalance';
import { StyledBalance } from '../../components/Balances/balancesStyles';
import { DailyBalance } from '../../components/Balances/DailyBalance';
import { StyledButton } from '../../components/shared/StyledButton';
import { useLoadedTransactions } from '../../components/lib/useLoadedTransactions';

export const BalancesPage = () => {
  const [transactions] = useLoadedTransactions(null);
  const history = useHistory();

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
