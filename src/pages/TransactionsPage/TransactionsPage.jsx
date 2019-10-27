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

  const handleEdit = transaction => {
    setTransactionToEdit(transaction);
    setIsEditing(true);
  };

  if (!isEditing && !isCreating) {
    return (
      <StyledTransactionsPage>
        <TransactionsList handleEdit={handleEdit} />
        <button onClick={()=> setIsCreating(true)}>add new</button>
      </StyledTransactionsPage>
    );
  }

  if (isEditing) {
    return <TransactionForm transaction={transactionToEdit} purpose='edit' />;
  }

  if (isCreating) {
    return <TransactionForm transaction={{}} purpose='create'/>;
  }
};

export { TransactionsPage };
