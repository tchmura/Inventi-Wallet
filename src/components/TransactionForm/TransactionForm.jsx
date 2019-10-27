import React, { useState } from 'react';

const TransactionForm = ({ purpose, transaction }) => {
  const [newTransaction, setNewTransaction] = useState(transaction);
  const {
    id,
    name: transactioName,
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

  const saveEditedTransaction = () => {
    fetch(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newTransaction)
    });
  };

  const saveCreatedTransaction = () => {
    fetch('transactions', {
      method: 'POST',
      body: JSON.stringify(newTransaction)
    });
  };

  const saveTransaction = (event) => {
    event.preventDefault();
    if (purpose === 'edit') {
      return saveEditedTransaction();
    }
    if (purpose === 'create') {
      return saveCreatedTransaction();
    }
  };

  return (
    <form onSubmit={saveTransaction}>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={transactioName}
          onChange={handleFormElementChange}
        />
      </div>
      <div>
        <label htmlFor='amount'>Amount</label>
        <select
          name='orientation'
          onChange={handleFormElementChange}
          defaultValue={orientation}
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
