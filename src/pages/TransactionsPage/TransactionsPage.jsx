import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { useHistory } from 'react-router-dom';

const StyledTransactionsPage = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 5px;
`;

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = () => {
    fetch('/transactions')
      .then(res => res.json())
      .then(response => setTransactions(response));
  };

  useEffect(() => {
    loadTransactions();
  }, []);

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

  const handleDelete = id => {
    fetch(`/transactions/${id}`, {
      method: 'DELETE'
    }).then(() => loadTransactions());
  };

  const history = useHistory();

  const redirectToNew = () => {
    history.push('transactions/new');
  };

  const redirectToEdit = transaction => {
    history.push('transactions/edit', { transaction });
  };

  return (
    <StyledTransactionsPage>
      <TransactionsList
        transactions={transactions}
        handleEdit={redirectToEdit}
        handleDelete={handleDelete}
        toggleExpanded={toggleExpanded}
      />
      <button onClick={redirectToNew}>add new</button>
    </StyledTransactionsPage>
  );
};

export { TransactionsPage };
