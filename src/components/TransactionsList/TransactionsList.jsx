import React from 'react';
import styled from 'styled-components/macro';
import { Transaction } from '../Transaction/Transaction';

export const StyledTransactionsList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 5px;
`;

const TransactionsList = ({
  transactions,
  handleEdit,
  handleDelete,
  toggleExpanded,
  filter
}) => {
  const getFilteredTransactions = transactions => {
    if (filter === 'IN') {
      return transactions.filter(
        transaction => transaction.orientation === 'IN'
      );
    }
    if (filter === 'OUT') {
      return transactions.filter(
        transaction => transaction.orientation === 'OUT'
      );
    }
    return transactions;
  };

  return (
    transactions &&
    getFilteredTransactions(transactions).map(transaction => (
      <Transaction
        key={transaction.id}
        transaction={transaction}
        toggleExpanded={toggleExpanded}
        handleEdit={() => handleEdit(transaction)}
        handleDelete={() => handleDelete(transaction.id)}
      />
    ))
  );
};

export { TransactionsList };
