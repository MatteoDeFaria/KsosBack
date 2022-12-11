import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Logger } from '../config/logger.config';

const BodyValidationMiddleware =
  (dtoClass: any) => (req: Request, res: Response, next: NextFunction) => {
    const logger = Logger.Instance;
    const body: any = plainToInstance(dtoClass, req.body, {
      excludeExtraneousValues: true,
    });

    validate(body, { forbidUnknowValues: true }).then((error) => {
      if (error.length > 0) {
        logger.debug(error);
        next(new Error ("Body error"));
      } else next();
    });
  };

export default BodyValidationMiddleware;
