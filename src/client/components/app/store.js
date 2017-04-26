import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import history from './history';
import { createMemoryStatReducer } from '../memory-chart/memory-stat-reducer';
import { alertsReducer } from '../alerts/alerts-reducer';
import webSocketsMiddleware from './middleware/websockets';

const reducer = combineReducers({
  routing: routerReducer,
  memoryStats: createMemoryStatReducer({ limit: 60 }),
  alerts: alertsReducer(),
});

const logger = createLogger({
  collapsed: true,
});

const initialState = {};

const middleware = [
  routerMiddleware(history),
  logger,
];

const setup = applyMiddleware(...middleware)(createStore);

const store = setup(reducer, initialState);

webSocketsMiddleware(store);

export default store;
