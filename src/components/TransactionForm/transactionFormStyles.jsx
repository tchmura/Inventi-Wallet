import styled from 'styled-components/macro';
import { border, borderRadius } from '../Transaction/transactionStyles';
import { StyledButton } from '../shared/StyledButton';

export const StyledHeading = styled.h1`
  margin: 0 auto 30px;
  color: #76659c;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

export const StyledForm = styled.form`
  display: grid;
  gap: 30px;
  color: #656969;
`;

export const StyledFormSection = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
`;

export const StyledAmount = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 5px;
`;

export const StyledSelect = styled.select`
  border: ${border};
  border-radius: ${borderRadius};
  text-align-last: center;
`;

const errorBorder = 'solid 3px red';
export const StyledInput = styled.input`
  background-color: #faf7f7;
  border: ${props => (props.validationError ? errorBorder : border)};
  border-radius: ${borderRadius};
  font-family: serif;
  padding: 5px;
  font-size: 14px;
  text-align: center;
`;

export const StyledLabel = styled.label`
  align-self: center;
`;

export const StyledFormButton = styled(StyledButton)`
  color: white;
  font-size: 14px;
  &:disabled {
    opacity: 0.3;
  }
`;
