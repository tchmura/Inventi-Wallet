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
  toggleExpanded
}) => {
  return (
    <StyledTransaction onClick={() => toggleExpanded(id)} isExpanded={isExpanded}>
      <StyledName>{name}</StyledName>
      <StyledAmountWrapper>
        <StyledAmount orientation={orientation}>
          {orientation === 'IN' ? '+' : '-'} {amount}
        </StyledAmount>
        <StyledCurrency>{currency}</StyledCurrency>
      </StyledAmountWrapper>
      {isExpanded && (
        <>
          <StyledTimestamp>
            <div>{time}</div>
            <div>{date}</div>
          </StyledTimestamp>
          <StyledButtonsWrapper>
            <StyledButton bgColor='#76659c'>
              <FontAwesomeIcon icon={['fas', 'edit']} color='white' />
            </StyledButton>
            <StyledButton bgColor='#b32424'>
              <FontAwesomeIcon icon={['fas', 'eraser']} color='white' />
            </StyledButton>
          </StyledButtonsWrapper>
        </>
      )}
    </StyledTransaction>
  );
};

export { Transaction };
