import styled from 'styled-components/macro';

const labelColor = '#656969';

export const border = 'solid 1px #d0d6d6';

export const borderRadius = '5px';

export const StyledTransaction = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 0.7fr;
  grid-template-areas:
    'name name amount amount'
    'timestamp timestamp buttons buttons';
  row-gap: ${props => (props.isExpanded ? '8px' : '0')};
  padding: 8px;
  background-color: white;
  border: ${border};
  border-radius: ${borderRadius};
`;

export const StyledName = styled.div`
  font-size: 18px;
  color: ${labelColor};
  text-align: left;
  align-self: center;
  grid-area: name;
`;

export const StyledAmount = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: right;
  align-self: center;
  color: ${props => (props.orientation === 'OUT' ? 'red' : 'green')};
`;

export const StyledAmountWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.6fr;
  gap: 7px;
  grid-area: amount;
`;

export const StyledCurrency = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${labelColor};
  text-align: right;
  align-self: center;
`;

export const StyledTimestamp = styled.span`
  display: grid;
  grid-template-columns: minmax(0, max-content) 1fr;
  gap: 10px;
  grid-area: timestamp;
  font-size: 16px;
  color: ${labelColor};
  align-self: center;
`;

export const StyledButtonsWrapper = styled.div`
  grid-area: buttons;
  display: grid;
  grid-template-columns: 50px 50px;
  gap: 8px;
  justify-self: right;
`;
