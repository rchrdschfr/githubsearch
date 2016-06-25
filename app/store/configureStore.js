import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import promiseMiddleware from 'middlewares/promiseMiddleware';
import createLogger from 'redux-logger';
import { responsiveStoreEnhancer } from 'redux-responsive';

export default function configureStore(initialState) {
  const middleware = [thunk, promiseMiddleware];
  if (__DEVCLIENT__) {
    middleware.push(createLogger());
  }

  const store = createStore(rootReducer, initialState, compose(
    responsiveStoreEnhancer,
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
