export const convertTransactionsToCzk = transactions => {
  return transactions.map(transaction => {
    switch (transaction.currency) {
      case 'EUR':
        return {
          ...transaction,
          amount: transaction.amount * 26,
          currency: 'CZK'
        };
      case 'GBP':
        return {
          ...transaction,
          amount: transaction.amount * 30,
          currency: 'CZK'
        };

      case 'USD':
        return {
          ...transaction,
          amount: transaction.amount * 23,
          currency: 'CZK'
        };

      default:
        return transaction;
    }
  });
};
