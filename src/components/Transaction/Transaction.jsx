import React from 'react';
import {
  StyledTransaction,
  StyledName,
  StyledAmount,
  StyledCurrency,
  StyledAmountWrapper,
  StyledTimestamp,
  StyledButtonsWrapper
} from './transactionStyles';
import { StyledButton } from '../shared/StyledButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Transaction = ({
  transaction: {
    id,
    name,
    orientation,
    amount,
    currency,
    time,
    date,
    isExpanded
  },
  toggleExpanded,
  handleEdit,
  handleDelete
}) => {
  return (
    <StyledTransaction
      onClick={() => toggleExpanded(id)}
      isExpanded={isExpanded}
    >
      <StyledName>{name}</StyledName>
      <StyledAmountWrapper>
        <StyledAmount orientation={orientation}>
          {orientation === 'IN' ? '+' : '-'} {amount.toLocaleString('cs')}
        </StyledAmount>
        <StyledCurrency>{currency}</StyledCurrency>
      </StyledAmountWrapper>
      {isExpanded && (
        <>
          <StyledTimestamp>
            <div>{time}</div>
            <div>{new Date(date).toLocaleDateString('cs')}</div>
          </StyledTimestamp>
          <StyledButtonsWrapper>
            <StyledButton bgColor='#76659c' onClick={handleEdit}>
              <FontAwesomeIcon icon={['fas', 'edit']} color='white' />
            </StyledButton>
            <StyledButton bgColor='#b32424' onClick={handleDelete}>
              <FontAwesomeIcon icon={['fas', 'eraser']} color='white' />
            </StyledButton>
          </StyledButtonsWrapper>
        </>
      )}
    </StyledTransaction>
  );
};

export { Transaction };
