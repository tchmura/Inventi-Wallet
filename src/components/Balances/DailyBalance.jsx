import React, { useState } from 'react';
import { convertTransactionsToCzk } from '../lib/utils';
import {
  StyledTitle,
  StyledAmount,
  StyledDailyBalanceInput
} from './balancesStyles';

export const DailyBalance = ({ transactions }) => {
  const [balanceForDay, setBalanceForDay] = useState(0);
  const handleInputChange = event => {
    const transactionsForSelected = transactions.filter(
      transaction => transaction.date === event.target.value
    );

    if (transactionsForSelected.length) {
      const balanceInCzk = convertTransactionsToCzk(
        transactionsForSelected
      ).reduce((acc, transaction) => {
        const { amount, orientation } = transaction;
        if (orientation === 'IN') {
          acc += amount;
        } else {
          acc -= amount;
        }
        return acc;
      }, 0);

      setBalanceForDay(balanceInCzk);
    }
  };

  return (
    <>
      <StyledTitle>Daily Balance</StyledTitle>
      <StyledDailyBalanceInput type='date' onChange={handleInputChange} />
      <StyledAmount>{`${balanceForDay.toLocaleString('cs')} CZK`}</StyledAmount>
    </>
  );
};
