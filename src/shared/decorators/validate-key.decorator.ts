import type { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { DataSource } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { UnauthorizedException } from '../exceptions';

export const ValidateApiKey = (role?: 'CLUB' | 'TEACHER') => {
  return (
    target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalFunction: Function = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const qb = Container.get<DataSource>('db')
        .getRepository(User)
        .createQueryBuilder('user')
        .select()
        .where('user.code = :code', { code: req.headers['x-api-key'] });
      if (role) qb.where('user.userType = :userType', { userType: role });
      if (!req.headers['x-api-key'] || !(await qb.getOne()))
        throw new UnauthorizedException();
      return originalFunction.apply(this, [req, res, next]);
    };
    return descriptor;
  };
};
