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
    <StyledTransaction onClick={() => toggleExpanded(id)}>
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
            <button>
              <FontAwesomeIcon icon={['far', 'edit']} />
            </button>
            <button>bbb</button>
          </StyledButtonsWrapper>
        </>
      )}
    </StyledTransaction>
  );
};

export { Transaction };
