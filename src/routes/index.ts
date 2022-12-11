import express from 'express';
import ILolService from '../service/ILolService';
import LolRouter from './LolRouter';

export default async (lolService: ILolService) => {
  const router = express.Router();

  router.get('/health', (req, res) => {
    res.status(200).send('Server up');
  });

  router.use('/lol', await LolRouter(lolService));

  return router;
};
