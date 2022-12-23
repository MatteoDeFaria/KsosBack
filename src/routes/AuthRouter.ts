import express, { NextFunction, Request, Response } from 'express';
import BodyValidationMiddleware from '../middleware/LolMiddleware.ts';
import IAuthService from '../service/IAuthService';
import RegisterDto from './dtos/registerDto';

export default async (authService: IAuthService) => {
  const router = express.Router();

  const postRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await authService
      .postRegisterUser(res.locals.input)
      .then(() => res.sendStatus(200))
      .catch(next);
  };

  router.post('/register', BodyValidationMiddleware(RegisterDto), postRegister);
  return router;
};
