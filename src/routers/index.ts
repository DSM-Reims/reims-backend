import { Router } from 'express';
import { GoodsController } from 'src/controllers/goods.controller';
import { Container } from 'typedi';
import { RouteResolver } from './route-resolver';

export const routers = () => {
  const router = Router();
  const goodsController = Container.get(GoodsController);
  RouteResolver(router, goodsController);

  return router;
};
