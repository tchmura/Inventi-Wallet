import React, { useState } from 'react';
import { Transaction } from '../Transaction/Transaction';

const dummyData = [
  {
    id: 1,
    name: 'first transaction',
    orientation: 'IN',
    amount: 485,
    currency: 'CZK',
    time: '14:56',
    date: '11.03.2018',
    isExpanded: false
  },
  {
    id: 2,
    name: 'second transaction',
    orientation: 'OUT',
    amount: 48,
    currency: 'EUR',
    time: '09:06',
    date: '15.03.2018',
    isExpanded: false
  },
  {
    id: 3,
    name: 'third transaction',
    orientation: 'IN',
    amount: 7900679897,
    currency: 'GB',
    time: '20:34',
    date: '16.03.2018',
    isExpanded: false
  }
];

const TransactionsList = () => {
  const [transactions, setTransactions] = useState(dummyData);

  const toggleExpanded = transactionId => {
    const updatedTransactions =
      transactions.map(transaction => {
        if (transaction.id === transactionId) {
          transaction.isExpanded = !transaction.isExpanded;
        } else {
          transaction.isExpanded = false;
        }
        return transaction;
      });
    
    setTransactions(updatedTransactions);
  };

  return transactions.map(transaction => {
    return (
      <Transaction
        key={transaction.id}
        transaction={transaction}
        toggleExpanded={toggleExpanded}
      />
    );
  });
};

export { TransactionsList };
