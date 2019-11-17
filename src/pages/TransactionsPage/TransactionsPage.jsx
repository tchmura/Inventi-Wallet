import React, { useState, useEffect, useCallback } from 'react';
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
  StyledBalancesButton,
  StyledPageButton,
  StyledPageButtonGroup
} from './transactionsPageStyles';
import { useLoadedTransactions } from '../../components/lib/useLoadedTransactions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TransactionsPage = () => {
  const [
    transactions,
    setTransactions,
    reloadTransactions
  ] = useLoadedTransactions(null);
  const [transactionsToDisplay, setTransactionsToDisplay] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(0);
  const history = useHistory();

  const toggleExpanded = transactionId => {
    const updatedTransactions =
      transactions &&
      transactions.map(transaction => {
        const newTransaction = transaction;
        if (newTransaction.id === transactionId) {
          newTransaction.isExpanded = !newTransaction.isExpanded;
        } else {
          newTransaction.isExpanded = false;
        }
        return newTransaction;
      });

    setTransactions(updatedTransactions);
  };

  const setPagination = useCallback(
    pageNumber => {
      transactions &&
        setTransactionsToDisplay(
          transactions.slice(pageNumber * 5, pageNumber * 5 + 5)
        );
    },
    [transactions]
  );

  useEffect(() => {
    setPagination(currentPage);
  }, [transactions, currentPage, setPagination]);

  const getButtons = () => {
    return Array(Math.ceil(transactions.length / 5)).fill();
  };

  const handleDelete = id => {
    fetch(`/transactions/${id}`, {
      method: 'DELETE'
    }).then(() => reloadTransactions());
  };

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
          transactions={transactionsToDisplay}
          handleEdit={redirectToEdit}
          handleDelete={handleDelete}
          toggleExpanded={toggleExpanded}
          filter={filter}
        />
      </StyledTransactionsList>
      <StyledPageButtonGroup>
        {transactions &&
          getButtons().map((_, index) => (
            <StyledPageButton
              selected={currentPage === index}
              onClick={() => setCurrentPage(index)}
              key={index}
            >
              {index + 1}
            </StyledPageButton>
          ))}
      </StyledPageButtonGroup>
      <AddNewButton onClick={redirectToNew}>
        <AddNewText>Add new</AddNewText>
        <FontAwesomeIcon icon={['fas', 'plus']} color='#B6A7D4' />
      </AddNewButton>
    </StyledTransactionsPage>
  );
};

export { TransactionsPage };
