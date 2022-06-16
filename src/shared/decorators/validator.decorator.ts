import type { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { BadRequestException } from '../exceptions';

export const ValidateBody = <T extends object>(
  c: new (...args: any[]) => T,
) => {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalFunction = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      if (!Object.keys(req.body).length) {
        throw new BadRequestException();
      } else {
        const classObject = plainToClass(c, req.body);
        try {
          await validateOrReject(classObject, {
            whitelist: true,
            forbidNonWhitelisted: true,
          });
        } catch (err) {
          throw new BadRequestException();
        }
        return originalFunction.apply(this, [req, res, next]);
      }
    };
    return descriptor;
  };
};

export const ValidateQuery = <T extends object>(
  c: new (...args: any[]) => T,
) => {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalFunction = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      if (!Object.keys(req.query).length) {
        throw new BadRequestException();
      } else {
        const classObject = plainToClass(c, req.query);
        try {
          await validateOrReject(classObject, {
            whitelist: true,
            forbidNonWhitelisted: true,
          });
        } catch (err) {
          throw new BadRequestException();
        }
        return originalFunction.apply(this, [req, res, next]);
      }
    };
    return descriptor;
  };
};
