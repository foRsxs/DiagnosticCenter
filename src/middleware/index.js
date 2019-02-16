import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const middlewareList = [];

if (__DEV__) middlewareList.push(createLogger({collapsed: true}));

export default applyMiddleware(...middlewareList, thunk);
