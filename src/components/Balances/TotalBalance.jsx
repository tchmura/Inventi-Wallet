import React from 'react';
import { convertTransactionsToCzk } from '../shared/utils';
import { StyledTitle, StyledAmount } from './balancesStyles';

export const TotalBalance = ({ transactions }) => {
  const totalBalance = convertTransactionsToCzk(transactions).reduce(
    (acc, transaction) => {
      const { amount, orientation } = transaction;
      if (orientation === 'IN') {
        acc += amount;
      } else {
        acc -= amount;
      }
      return acc;
    },
    0
  );

  return (
    <>
      <StyledTitle>Total Balance</StyledTitle>
      <StyledAmount>{`${totalBalance.toLocaleString('cs')} CZK`}</StyledAmount>
    </>
  );
};
