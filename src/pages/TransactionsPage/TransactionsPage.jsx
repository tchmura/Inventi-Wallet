import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { TransactionForm } from '../../components/TransactionForm/TransactionForm';

const StyledTransactionsPage = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 5px;
`;

const TransactionsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState({});
  const [transactionsLoadTrigger, setTransactionsLoadTrigger] = useState(false);

  const handleEdit = transaction => {
    setTransactionToEdit(transaction);
    setIsEditing(true);
  };

  const triggerTransactionsLoad = () => {
    setTransactionsLoadTrigger(prevState => !prevState);
  };

  if (!isEditing && !isCreating) {
    return (
      <StyledTransactionsPage>
        <TransactionsList
          handleEdit={handleEdit}
          transactionsLoadTrigger={transactionsLoadTrigger}
          triggerTransactionsLoad={triggerTransactionsLoad}
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
        triggerTransactionsLoad={triggerTransactionsLoad}
        showTransactionsList={() => setIsEditing(false)}
      />
    );
  }

  if (isCreating) {
    return (
      <TransactionForm
        transaction={{ orientation: 'OUT' }}
        purpose='create'
        triggerTransactionsLoad={triggerTransactionsLoad}
        showTransactionsList={() => setIsCreating(false)}
      />
    );
  }
};

export { TransactionsPage };
