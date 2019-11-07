import React, { useState, useEffect } from 'react';

const TransactionForm = ({
  purpose,
  transaction,
  showTransactionsList,
  loadTransactions
}) => {
  const [newTransaction, setNewTransaction] = useState(transaction);
  const [validationErrors, setValidationErrors] = useState({});
  const {
    id,
    name,
    orientation,
    amount,
    currency,
    time,
    date
  } = newTransaction;
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
    Object.entries(newTransaction).forEach(entry =>
      validateFormField(entry[0], entry[1])
    );
  }, [newTransaction]);

  const handleFormElementChange = event => {
    const { name, value } = event.target;
    validateFormField(name, value);
    setNewTransaction(prevState => ({ ...prevState, [name]: value }));
  };

  const persistEditedTransaction = () => {
    fetch(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newTransaction)
    })
      .then(() => loadTransactions())
      .then(() => showTransactionsList());
  };

  const persistCreatedTransaction = () => {
    fetch('transactions', {
      method: 'POST',
      body: JSON.stringify(newTransaction)
    })
      .then(() => loadTransactions())
      .then(() => showTransactionsList());
  };

  const saveTransaction = event => {
    event.preventDefault();
    if (purpose === 'edit') {
      return persistEditedTransaction();
    }
    if (purpose === 'create') {
      return persistCreatedTransaction();
    }
  };

  return (
    <form onSubmit={saveTransaction}>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={handleFormElementChange}
        />
      </div>
      <div>
        <label htmlFor='amount'>Amount</label>
        <select
          name='orientation'
          onChange={handleFormElementChange}
          defaultValue={orientation || 'OUT'}
        >
          <option value='OUT'>-</option>
          <option value='IN'>+</option>
        </select>
        <input
          type='number'
          name='amount'
          value={amount}
          onChange={handleFormElementChange}
        />
        <select
          name='currency'
          value={currency}
          onChange={handleFormElementChange}
        >
          <option value='CZK'>CZK</option>
          <option value='EUR'>EUR</option>
          <option value='USD'>USD</option>
          <option value='GBP'>GBP</option>
        </select>
      </div>
      <div>
        <label htmlFor='time'>Time</label>
        <input
          name='time'
          type='time'
          value={time}
          onChange={handleFormElementChange}
        />
      </div>
      <div>
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          name='date'
          value={date}
          onChange={handleFormElementChange}
        />
      </div>
      <button type='submit' disabled={!isFormValid}>
        Save
      </button>
      <button type='button' onClick={() => showTransactionsList()}>
        Cancel
      </button>
    </form>
  );
};

export { TransactionForm };
