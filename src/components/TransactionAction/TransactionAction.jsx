import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TransactionForm } from '../TransactionForm/TransactionForm';

const TransactionAction = () => {
  const location = useLocation();
  const params = useParams();

  if (params.action === 'new') {
    const today = new Date();
    const rawMinutes = today.getUTCMinutes();
    const zeroPaddedMinutes = rawMinutes < 10 ? `0${rawMinutes}` : rawMinutes;

    // current time in format for time input
    const now = `${today.getUTCHours() + 1}:${zeroPaddedMinutes}`;
    return (
      <TransactionForm
        transaction={{
          name: '',
          orientation: 'OUT',
          amount: '',
          currency: 'CZK',
          time: now,
          // today in format for date input
          date: today.toISOString().substr(0, 10)
        }}
        action={params.action}
      />
    );
  }

  if (params.action === 'edit') {
    return (
      <TransactionForm
        transaction={{ ...location.state.transaction }}
        action={params.action}
      />
    );
  }
};

export { TransactionAction };
