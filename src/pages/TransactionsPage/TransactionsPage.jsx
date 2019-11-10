import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { useHistory } from 'react-router-dom';
import { StyledButton } from '../../components/shared/StyledButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledTransactionsPage = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 5px;
`;

const AddNewButton = styled(StyledButton)`
  background-color: #76659c;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
  margin-top: 15px;
`;

const AddNewText = styled.span`
  margin-right: 20px;
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
      <AddNewButton onClick={redirectToNew}>
        <AddNewText>Add new</AddNewText>
        <FontAwesomeIcon icon={['fas', 'plus']} color='#B6A7D4' />
      </AddNewButton>
    </StyledTransactionsPage>
  );
};

export { TransactionsPage };
