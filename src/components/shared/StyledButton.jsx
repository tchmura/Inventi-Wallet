import styled from 'styled-components/macro';

export const StyledButton = styled.button`
  margin: 0;
  padding: 4px 10px;
  border: solid 1px #d0d6d6;
  border-radius: 5px;
  background-color: ${props => props.bgColor};
`;