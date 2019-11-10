import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BalancesPage } from './pages/BalancesPage/BalancesPage';
import { TransactionAction } from './components/TransactionAction/TransactionAction';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/transactions/:action' component={TransactionAction} />
      <Route path='/balances' component={BalancesPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
