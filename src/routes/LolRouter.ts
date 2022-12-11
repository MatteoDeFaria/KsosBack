import express, { NextFunction, Request, Response } from 'express';
import BodyValidationMiddleware from '../middleware/LolMiddleware.ts';
import ILolService from '../service/ILolService';
import LolDto from './dtos/lolDto';

export default async (lolService: ILolService) => {
  const router = express.Router();

  const postUser = async (req: Request, res: Response, next: NextFunction) => lolService
      .getData()
      .then((data) => res.status(200).send(data))
      .catch(next);

  router.get('/leaderboard', (req, res) => {
    res.status(200).send('Lol up');
  });

  router.post('user', BodyValidationMiddleware(LolDto), postUser);
  return router;
};
