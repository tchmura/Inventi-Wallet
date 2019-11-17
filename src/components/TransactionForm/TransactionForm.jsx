import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  StyledForm,
  StyledFormSection,
  StyledAmount,
  StyledHeading,
  StyledInput,
  StyledSelect,
  StyledLabel,
  StyledFormButton
} from './transactionFormStyles';

export const TransactionForm = ({ action, transaction }) => {
  const history = useHistory();
  const [transactionToModify, setTransactionToModify] = useState(transaction);
  const [validationErrors, setValidationErrors] = useState({});
  const {
    id,
    name,
    orientation,
    amount,
    currency,
    time,
    date
  } = transactionToModify;
  const [isFormValid, setIsFormValid] = useState(false);

  const validateFormField = (fieldName, value) => {
    let result;
    switch (fieldName) {
      case 'name':
        // non-empty string
        result = /^(?!\s*$).+/.test(value)
          ? ''
          : 'Must contain at least one character';
        setValidationErrors(prevState => ({
          ...prevState,
          name: result
        }));
        break;
      case 'amount':
        // only numbers
        result = /^\d+$/.test(value) ? '' : 'Use only numbers';
        setValidationErrors(prevState => ({
          ...prevState,
          amount: result
        }));
        break;
      case 'time':
        // HH:MM
        result = /^\d\d[':']\d\d$/.test(value)
          ? ''
          : 'Use time in format HH:MM';
        setValidationErrors(prevState => ({
          ...prevState,
          time: result
        }));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (Object.values(validationErrors).every(val => !!val === false)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [validationErrors]);

  useEffect(() => {
    Object.entries(transactionToModify).forEach(entry =>
      validateFormField(entry[0], entry[1])
    );
  }, [transactionToModify]);

  const handleFormElementChange = event => {
    const { name, value } = event.target;
    validateFormField(name, value);
    setTransactionToModify(prevState => ({ ...prevState, [name]: value }));
  };

  const persistEditedTransaction = () => {
    return fetch(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionToModify)
    });
  };

  const persistNewTransaction = () => {
    return fetch('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionToModify)
    });
  };

  const redirectToTransactions = () => {
    history.push('/');
  };

  const saveTransaction = async event => {
    event.preventDefault();
    if (action === 'edit') {
      await persistEditedTransaction();
      redirectToTransactions();
    }
    if (action === 'new') {
      await persistNewTransaction();
      redirectToTransactions();
    }
  };

  const heading =
    action === 'new' ? 'Create new transaction' : 'Edit your transaction';

  return (
    <>
      <StyledHeading>{heading}</StyledHeading>
      <StyledForm onSubmit={saveTransaction}>
        <StyledFormSection>
          <StyledLabel htmlFor='name'>Name</StyledLabel>
          <StyledInput
            type='text'
            name='name'
            value={name}
            onChange={handleFormElementChange}
            validationError={validationErrors.name}
          />
        </StyledFormSection>
        <StyledFormSection>
          <StyledLabel htmlFor='amount'>Amount</StyledLabel>
          <StyledAmount>
            <StyledSelect
              name='orientation'
              onChange={handleFormElementChange}
              defaultValue={orientation}
            >
              <option value='OUT'>-</option>
              <option value='IN'>+</option>
            </StyledSelect>
            <StyledInput
              type='number'
              name='amount'
              value={amount}
              onChange={handleFormElementChange}
              validationError={validationErrors.amount}
            />
            <StyledSelect
              name='currency'
              value={currency}
              onChange={handleFormElementChange}
            >
              <option value='CZK'>CZK</option>
              <option value='EUR'>EUR</option>
              <option value='USD'>USD</option>
              <option value='GBP'>GBP</option>
            </StyledSelect>
          </StyledAmount>
        </StyledFormSection>
        <StyledFormSection>
          <StyledLabel htmlFor='time'>Time</StyledLabel>
          <StyledInput
            name='time'
            type='time'
            value={time}
            onChange={handleFormElementChange}
          />
        </StyledFormSection>
        <StyledFormSection>
          <StyledLabel htmlFor='date'>Date</StyledLabel>
          <StyledInput
            type='date'
            name='date'
            value={date}
            onChange={handleFormElementChange}
          />
        </StyledFormSection>
        <StyledFormButton
          type='submit'
          disabled={!isFormValid}
          bgColor='#76659c'
        >
          Save
        </StyledFormButton>
        <StyledFormButton
          type='button'
          onClick={() => redirectToTransactions()}
          bgColor='grey'
        >
          Cancel
        </StyledFormButton>
      </StyledForm>
    </>
  );
};
