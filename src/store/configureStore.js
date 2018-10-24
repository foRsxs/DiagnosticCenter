import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(thunk)
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}