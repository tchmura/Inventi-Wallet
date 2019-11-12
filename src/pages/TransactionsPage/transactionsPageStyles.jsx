import styled from 'styled-components/macro';
import { StyledButton } from '../../components/shared/StyledButton';

export const StyledTransactionsPage = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`;

export const AddNewButton = styled(StyledButton)`
  background-color: #76659c;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
  margin-top: 15px;
`;

export const AddNewText = styled.span`
  margin-right: 20px;
`;

export const StyledButtonGroup = styled.div`
  text-align: center;
  margin-bottom: 20px;
  button:first-child {
    border-right: 1px solid transparent;
    border-radius: 5px 0 0 5px;
  }
  button:nth-child(3) {
    margin-right: 30px;
    border-right: 1px solid transparent;
    border-radius: 0 5px 5px 0;
  }
`;

export const StyledFilterButton = styled.button`
  margin: 0;
  outline: none;
  border: none;
  padding: 8px 12px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${props => (props.selected ? '#529aa8' : '#b8eaf2')};
  color: ${props => (props.selected ? 'white' : '#529aa8')};
`;

export const StyledBalancesButton = styled(StyledButton)`
  background-color: #76659c;
  padding: 8px 16px;
  font-size: 18px;
`;
