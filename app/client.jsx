/* This is the "entry point" for our client-side app */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin(); // this is needed until it officially becomes part of React

import App from 'containers/App';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

// mount the app onto the document
// the Provider component gives us access to the Redux store
render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
