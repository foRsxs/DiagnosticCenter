import { createStore } from 'redux';
import { persistStore, persistReducer, createTransform  } from 'redux-persist';
import { offlineActionTypes, checkInternetConnection } from 'react-native-offline';
import storage from 'redux-persist/lib/storage';

import { authActions } from '../actions/auth';
import { contentActions } from '../actions/content';
import middleware from '../middleware';
import rootReducer from '../reducers';

const actions = {
  authActions,
  contentActions
};

const networkTransform = createTransform(
  (inboundState, key) => {
    const actionQueue = [];

    inboundState.actionQueue.forEach(action => {
      if (typeof action === 'function') {
        actionQueue.push({
          function: action.meta.name,
          args: action.meta.args,
        });
      } else if (typeof action === 'object') {
        actionQueue.push(action);
      }
    });

    return {
      ...inboundState,
      actionQueue,
    };
  },
  (outboundState, key) => {
    const actionQueue = [];

    outboundState.actionQueue.forEach(action => {
      if (action.function) {
        const actionFunction = actions[action.function];
        actionQueue.push(actionFunction(...action.args));
      } else {
        actionQueue.push(action);
      }
    });
    return { ...outboundState, actionQueue };
  },
  { whitelist: ['network'] },
);

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage,
  transforms: [networkTransform],
  whitelist: ['authorization', 'content']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(callback) {
  let store = createStore(
    persistedReducer,
    middleware
  );

  persistStore(store, null, () => {
    checkInternetConnection().then(isConnected => {
      store.dispatch({
        type: offlineActionTypes.CONNECTION_CHANGE,
        payload: isConnected,
      });
      callback();
    });
  });

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}