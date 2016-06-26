/* The store is where the state of the application is held. When the store data
   changes, it is passed to React, which determines if it is neccesary to re-render */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import promiseMiddleware from 'middlewares/promiseMiddleware';
import createLogger from 'redux-logger';
import { responsiveStoreEnhancer } from 'redux-responsive';

export default function configureStore(initialState) {
  // thunk lets our actions return functions, promiseMiddleware lets our actions return promises
  const middleware = [thunk, promiseMiddleware];

  if (__DEVCLIENT__) {
    middleware.push(createLogger()); // write to log when the state changes in dev mode
  }

  /* create the store using the reducers we defined, the initial state from
     server side rendering and the middleware we've chosen */
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
