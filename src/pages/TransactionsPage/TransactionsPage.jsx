import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { TransactionForm } from '../../components/TransactionForm/TransactionForm';

const StyledTransactionsPage = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 5px;
`;

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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

  const handleEdit = transaction => {
    setTransactionToEdit(transaction);
    setIsEditing(true);
  };

  if (!isEditing && !isCreating) {
    return (
      <StyledTransactionsPage>
        <TransactionsList
          transactions={transactions}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleExpanded={toggleExpanded}
        />
        <button onClick={() => setIsCreating(true)}>add new</button>
      </StyledTransactionsPage>
    );
  }

  if (isEditing) {
    return (
      <TransactionForm
        transaction={transactionToEdit}
        purpose='edit'
        showTransactionsList={() => setIsEditing(false)}
        loadTransactions={loadTransactions}
      />
    );
  }

  if (isCreating) {
    return (
      <TransactionForm
        transaction={{
          name: '',
          orientation: 'OUT',
          amount: '',
          currency: '',
          time: '',
          date: ''
        }}
        loadTransactions={loadTransactions}
        purpose='create'
        showTransactionsList={() => setIsCreating(false)}
      />
    );
  }
};

export { TransactionsPage };
