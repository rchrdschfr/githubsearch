import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from 'containers/App';
import configureStore from 'store/configureStore';
import header from 'components/Meta';

export default function render(req, res) {
  const store = configureStore({
    // put initial state here
  });
  const initialState = store.getState();
  const componentHTML = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

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
