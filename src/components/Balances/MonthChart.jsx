import { Bar } from '@nivo/bar';
import React from 'react';
import { StyledTitle } from './balancesStyles';
import { convertTransactionsToCzk } from '../lib/utils';

export const MonthChart = ({ transactions }) => {
  const serializedTransactionsForMonthly = convertTransactionsToCzk(
    transactions
  ).map(transaction => {
    return { ...transaction, date: transaction.date.slice(0, 7) };
  });

  const monthlyBalance = serializedTransactionsForMonthly.reduce(
    (acc, transaction) => {
      const { amount, date, orientation } = transaction;
      if (orientation === 'IN') {
        acc[date] += amount;
      } else {
        acc[date] -= amount;
      }
      return acc;
    },
    {
      '2019-01': 0,
      '2019-02': 0,
      '2019-03': 0,
      '2019-04': 0,
      '2019-05': 0,
      '2019-06': 0,
      '2019-07': 0,
      '2019-08': 0,
      '2019-09': 0,
      '2019-10': 0,
      '2019-11': 0,
      '2019-12': 0
    }
  );

  const monthlyBalanceSerialized = Object.entries(
    monthlyBalance
  ).map(entry => ({ date: entry[0], amount: entry[1] }));

  return (
    <>
      <StyledTitle>Montly Balance</StyledTitle>
      <Bar
        data={monthlyBalanceSerialized}
        indexBy={'date'}
        keys={['amount']}
        layout={'horizontal'}
        axisBottom={{ tickValues: 0 }}
        margin={{ right: 150, left: 50 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        width={450}
        height={350}
      />
    </>
  );
};
