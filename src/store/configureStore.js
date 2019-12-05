import { createStore } from 'redux';
import { persistStore, persistReducer  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import middleware from '../middleware';
import rootReducer from '../reducers';
import initialState from './initialState';

const persistConfig = {
  timeout: null,
  key: 'root',
  storage,
  whitelist: ['authorization', 'content']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() { 
  const store = createStore(persistedReducer, initialState, middleware);
  const persistor = persistStore(store);

  return { store, persistor }
}
