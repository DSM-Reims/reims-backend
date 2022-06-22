import { Router } from 'express';
import { GoodsController } from 'src/controllers/goods.controller';
import { ResultController } from 'src/controllers/result.controller';
import { UsersController } from 'src/controllers/users.controller';
import { Container } from 'typedi';
import { RouteResolver } from './route-resolver';

export const routers = () => {
  const router = Router();
  const goodsController = Container.get(GoodsController);
  const resultController = Container.get(ResultController);
  const usersController = Container.get(UsersController);

  RouteResolver(router, goodsController);
  RouteResolver(router, resultController);
  RouteResolver(router, usersController);

  return router;
};
