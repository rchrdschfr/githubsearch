/* The code in this file is run on the server and is used to give us server side
   rendering capabilities */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from 'containers/App';
import configureStore from 'store/configureStore';
import header from 'components/Meta';

/* Render the App once a request hits the server */
export default function render(req, res) {
  const store = configureStore({
    // if you want the initial state to reflect data that
    // can be fetched from the server, put it here
  });
  const initialState = store.getState();
   // the Provider component gives us access to the Redux store
  const componentHTML = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // generate the initial HTML and respond to the client with it
  res.status(200).send(`
    <!doctype html>
    <html ${header.htmlAttributes.toString()}>
      <head>
        ${header.title.toString()}
        ${header.meta.toString()}
        ${header.link.toString()}
      </head>
      <body>
        <div id="app">${componentHTML}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
        <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
      </body>
    </html>
  `);
}
