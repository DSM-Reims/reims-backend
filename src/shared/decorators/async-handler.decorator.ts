import type { Request, Response, NextFunction } from 'express';

export function AsyncHandler() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalFunction = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      await originalFunction(req, res, next).catch(next);
    };
    return descriptor;
  };
}
