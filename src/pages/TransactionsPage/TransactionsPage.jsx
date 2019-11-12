import React, { useState, useEffect } from 'react';
import {
  TransactionsList,
  StyledTransactionsList
} from '../../components/TransactionsList/TransactionsList';
import { useHistory } from 'react-router-dom';
import {
  StyledTransactionsPage,
  AddNewButton,
  AddNewText,
  StyledButtonGroup,
  StyledFilterButton,
  StyledBalancesButton
} from './transactionsPageStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('ALL');

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

  const redirectToBalances = () => {
    history.push('/balances');
  };

  return (
    <StyledTransactionsPage>
      <StyledButtonGroup>
        <StyledFilterButton
          onClick={() => setFilter('ALL')}
          selected={filter === 'ALL'}
        >
          All
        </StyledFilterButton>
        <StyledFilterButton
          onClick={() => setFilter('IN')}
          selected={filter === 'IN'}
        >
          In
        </StyledFilterButton>
        <StyledFilterButton
          onClick={() => setFilter('OUT')}
          selected={filter === 'OUT'}
        >
          Out
        </StyledFilterButton>
        <StyledBalancesButton onClick={redirectToBalances}>
          <FontAwesomeIcon icon={['fas', 'chart-bar']} color='white' />
        </StyledBalancesButton>
      </StyledButtonGroup>
      <StyledTransactionsList>
        <TransactionsList
          transactions={transactions}
          handleEdit={redirectToEdit}
          handleDelete={handleDelete}
          toggleExpanded={toggleExpanded}
          filter={filter}
        />
      </StyledTransactionsList>
      <AddNewButton onClick={redirectToNew}>
        <AddNewText>Add new</AddNewText>
        <FontAwesomeIcon icon={['fas', 'plus']} color='#B6A7D4' />
      </AddNewButton>
    </StyledTransactionsPage>
  );
};

export { TransactionsPage };
