import styled from 'styled-components/macro';

export const StyledTitle = styled.h1`
  margin: 0 0 20px 0;
  font-size: 25px;
  color: #76659c;
`;

export const StyledBalance = styled.div`
  & > h1 {
    margin: 20px 0;
  }
`;

export const StyledAmount = styled.div`
  color: #b32424;
  margin: 0 auto;
  font-weight: bold;
  font-size: 18px;
`;

export const StyledDailyBalanceInput = styled.input`
  margin-bottom: 15px;
  background-color: #dcb1e6;
`;
