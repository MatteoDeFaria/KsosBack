import express from 'express';
import ILolService from '../service/ILolService';
import IAuthService from '../service/IAuthService';
import LolRouter from './LolRouter';
import AuthRouter from './AuthRouter';

export default async (lolService: ILolService, authService: IAuthService) => {
  const router = express.Router();

  router.get('/health', (req, res) => {
    res.status(200).send('Server up');
  });

  router.use('/lol', await LolRouter(lolService));
  router.use('/auth', await AuthRouter(authService));

  return router;
};
