import express from 'express';
import path from 'path';
import { ENV } from './appConfig';

export default (app) => {
  app.set('port', (process.env.PORT || 3000));
  app.disable('x-powered-by');

  app.use(express.static(path.join(__dirname, '../..', 'public')));
  app.set('trust proxy', 'loopback');

  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${ENV}`);
  console.log(`===>  Listening on port: ${app.get('port')}`);
  console.log('--------------------------');
};
