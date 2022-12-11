import winston from 'winston';
import expressWinston from 'express-winston';

/*
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};
*/

const createLoggerConfig = (logLevel?: string) => {
  const defaultLogLevel =
    process.env.NODE_ENV === 'production' ? 'info' : 'debug';
  return [
    new winston.transports.Console({
      level: logLevel || defaultLogLevel,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss',
        }),
        winston.format.simple(),
        winston.format.printf((msg) =>
          winston.format
            .colorize()
            .colorize(
              msg.level,
              `${msg.timestamp} - ${msg.level}: ${msg.message}`
            )
        )
      ),
    }),
  ];
};

const createMiddleware = () => {
  const transports = createLoggerConfig();
  return expressWinston.logger({
    transports,
    expressFormat: true,
  });
};

const createLogger = (logLevel?: string) => {
  const transports = createLoggerConfig(logLevel);
  return winston.createLogger({
    transports,
  });
};

class Logger {
  private static instance: winston.Logger;

  public static get Instance() {
    if (!Logger.instance) Logger.instance = createLogger();

    return Logger.instance;
  }
}

export { createMiddleware, Logger };
