import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import history from './history';
import { createCpuStatReducer } from '../home/cpu-chart/cpu-stat-reducer';
import webSocketsMiddleware from './middleware/websockets';

const reducer = combineReducers({
  routing: routerReducer,
  cpuStats: createCpuStatReducer({ limit: 60 }),
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
