export const convertTransactionsToCzk = transactions => {
  return transactions.map(transaction => {
    switch (transaction.currency) {
      case 'EUR':
        transaction.amount = transaction.amount * 26;
        transaction.currency = 'CZK';
        return transaction;
      case 'GBP':
        transaction.amount = transaction.amount * 30;
        transaction.currency = 'CZK';
        return transaction;
      case 'USD':
        transaction.amount = transaction.amount * 23;
        transaction.currency = 'CZK';
        return transaction;
      default:
        return transaction;
    }
  });
};
