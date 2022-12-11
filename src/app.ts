import express from 'express';
import dotenv from 'dotenv';
import routeBuilder from './routes/index';
import ErrorMiddleware from './middleware/ErrorMiddleware';
import LolService from './service/lol/LolService';

const initApp = async () => {
  const app = express();

  dotenv.config();

  app.set('port', process.env.PORT || 8000);
  //  app.set("hostname", process.env.HOSTNAME || "0.0.0.0");
  app.set('prefix', '/api');

  app.use(express.json());

  app.use('/api', await routeBuilder(new LolService()));

  app.use(ErrorMiddleware);

  return app;
};

export default initApp;
