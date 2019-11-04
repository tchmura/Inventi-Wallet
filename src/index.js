import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BalancesPage } from './pages/BalancesPage/BalancesPage';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/balances' component={BalancesPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
