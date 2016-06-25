// Import all your needed files first (webpack will grab the url)
import chromecon from 'images/android-icon-192x192.png';
import applecon from 'images/apple-icon-152x152.png';
import mscon from 'images/ms-icon-144x144.png';
import favicon from 'images/favicon-96x96.png';

const config = {
  link: [
    { rel: 'icon', href: "favicon" },
    { rel: 'icon', sizes: '192x192', href: chromecon },
    { rel: 'apple-touch-icon', sizes: '152x152', applecon },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto|Quicksand|Cabin', type: 'text/css' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    { rel: 'stylesheet', href: 'https://s3-us-west-2.amazonaws.com/rchrdschfr/spinkit/circle.css', type: 'text/css' },
    { rel: 'stylesheet', href: '/assets/styles/main.css' }
  ],
  meta: [
    { charset: 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'description', content: 'An awesome way to search for GitHub repos!' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'GitHubSearch' },
    { name: 'msapplication-TileImage', content: mscon },
    { name: 'msapplication-TileColor', content: '#00bcd4' }
  ]
};

export default config;
