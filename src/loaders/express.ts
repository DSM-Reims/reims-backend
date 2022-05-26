import { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import Container from 'typedi';
import { Logger } from 'src/shared/logger';
import { HttpException } from 'src/shared/exceptions';

export const init = (app: Application) => {
  const logger = Container.get(Logger);

  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    next();
  });

  app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      const statusCode: number = err.statusCode || 500;
      logger.error({ header: 'HTTP', message: `${req.path} ${statusCode}` });
      res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
        timeStamp: new Date(),
      });
    },
  );
  app.listen(+process.env.PORT!, () => {
    logger.log({
      header: 'ExpressApplication',
      message: `Server listening at port ${process.env.PORT}`,
    });
  });
};