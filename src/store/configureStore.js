import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import middleware from '../middleware';
import rootReducer from '../reducers';
import initialState from './initialState';

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage,
  whitelist: ['authorization'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(callback) {
  let store = createStore(
    persistedReducer,
    initialState,
    middleware
  );

  persistStore(store, null, () => {
    callback();
  });

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}