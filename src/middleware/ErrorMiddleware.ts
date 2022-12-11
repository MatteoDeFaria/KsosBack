import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { Logger } from '../config/logger.config';

const ErrorMiddleware = (
  error: ErrorRequestHandler,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = Logger.Instance;
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError) {
    // Errors during JSON middleware
    return res.status(400).send({
      message: 'Expected JSON body but it cannot be parsed',
      advanced: error.message,
    });
  }

  if (error instanceof Error) return res.status(400).send(error.message);

  logger.warn(`Unhandler error: ${error}`);
  return res
    .status(500)
    .send({
      message: 'Server error when processing the request, Try again later.',
      advanced: null,
    });
};

export default ErrorMiddleware;
