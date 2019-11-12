import styled from 'styled-components/macro';
import { border, borderRadius } from '../Transaction/transactionStyles';

export const StyledButton = styled.button`
  margin: 0;
  padding: 4px 10px;
  border: ${border};
  border-radius: ${borderRadius};
  background-color: ${props => props.bgColor};
`;
