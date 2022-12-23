import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routeBuilder from './routes/index';
import ErrorMiddleware from './middleware/ErrorMiddleware';
import LolService from './service/lol/LolService';
import AuthService from './service/AuthService';
import Prisma from './config/prisma.config';

const initApp = async () => {
  const app = express();

  dotenv.config();

  try {
    Prisma.initInstance();
  } catch (err) {
    process.exit(1);
  }

  // Express configuration
  app.set('port', process.env.PORT || 8000);
  app.set('prefix', '/api');

  app.use(cors());
  app.use(express.json());

  app.use('/api', await routeBuilder(new LolService(), new AuthService()));

  app.use(ErrorMiddleware);

  return app;
};

export default initApp;
