import React from 'react';
import { Transaction } from '../Transaction/Transaction';

const TransactionsList = ({
  transactions,
  handleEdit,
  handleDelete,
  toggleExpanded
}) => {
  return transactions.map(transaction => (
    <Transaction
      key={transaction.id}
      transaction={transaction}
      toggleExpanded={toggleExpanded}
      handleEdit={() => handleEdit(transaction)}
      handleDelete={() => handleDelete(transaction.id)}
    />
  ));
};

export { TransactionsList };
