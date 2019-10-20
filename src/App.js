import React from 'react';
import './App.css';
import { TransactionsPage } from './pages/TransactionsPage/TransactionsPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const App = () => {
  return <TransactionsPage />;
};

export default App;

library.add(faEdit);
