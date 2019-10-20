import React from 'react';
import styled from 'styled-components';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';

const StyledTransactionsPage = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 5px;
`;

const TransactionsPage = () => {
  return (
    <StyledTransactionsPage>
      <TransactionsList />
    </StyledTransactionsPage>
  );
};

export { TransactionsPage };
