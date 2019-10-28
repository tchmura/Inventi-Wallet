import React, { useState, useEffect } from 'react';
import { Transaction } from '../Transaction/Transaction';

const TransactionsList = ({ handleEdit, transactionsLoadTrigger }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    fetch('/transactions')
      .then(res => res.json())
      .then(response => isSubscribed && setTransactions(response));
    return () => {
      isSubscribed = false;
    };
  }, [transactionsLoadTrigger]);

  const toggleExpanded = transactionId => {
    const updatedTransactions = transactions.map(transaction => {
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
        handleEdit={() => handleEdit(transaction)}
      />
    );
  });
};

export { TransactionsList };
