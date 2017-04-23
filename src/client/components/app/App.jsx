import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import HomePage from '../home/HomePage';
import store from './store';
import history from './history';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route exact path="/" component={HomePage}/>
    </ConnectedRouter>
  </Provider>
);

export default App;
