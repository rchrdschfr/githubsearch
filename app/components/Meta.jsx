/* Use React Helmet to generate data to be used in the
   HTML head when the app is rendered on the server */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

// don't extract external stylesheets in development mode
// comment out if you do want to include external stylesheets
if (__DEVSERVER__) {
  //config.link = config.link.filter(l => l.rel !== 'stylesheet');
}

const Meta = () => (
  <Helmet
    htmlAttributes={{"lang": "en", "amp": undefined}}
    title="GitHubSearch" meta={config.meta}
    link={config.link}
  />
)

ReactDOMServer.renderToString(<Meta />);
const header = Helmet.rewind();

export default header;
