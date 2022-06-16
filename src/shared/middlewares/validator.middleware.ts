import type { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

type ClassLike<T> = new (...args: any[]) => T;

export function validator<T extends object>(c: ClassLike<T>) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!Object.keys(req.body).length) {
      res.sendStatus(400);
      return;
    } else {
      const classObject = plainToClass(c, req.body);
      validateOrReject(classObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
      })
        .then(next)
        .catch(() => res.sendStatus(400));
    }
  };
}
