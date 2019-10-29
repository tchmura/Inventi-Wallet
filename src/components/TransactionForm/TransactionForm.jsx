import React, { useState } from 'react';

const TransactionForm = ({
  purpose,
  transaction,
  showTransactionsList,
  loadTransactions
}) => {
  const [newTransaction, setNewTransaction] = useState(transaction);
  const {
    id,
    name,
    orientation,
    amount,
    currency,
    time,
    date
  } = newTransaction;

  const handleFormElementChange = event => {
    const { name, value } = event.target;
    return setNewTransaction(prevState => ({ ...prevState, [name]: value }));
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
          name='amount'
          value={amount}
          onChange={handleFormElementChange}
        />
        <input
          name='currency'
          value={currency}
          onChange={handleFormElementChange}
        />
      </div>
      <div>
        <label htmlFor='time'>Time</label>
        <input name='time' value={time} onChange={handleFormElementChange} />
      </div>
      <div>
        <label htmlFor='date'>Date</label>
        <input name='date' value={date} onChange={handleFormElementChange} />
      </div>
      <button type='submit'>Save</button>
    </form>
  );
};

export { TransactionForm };
