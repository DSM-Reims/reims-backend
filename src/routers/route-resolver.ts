import { Router } from 'express';
import { Logger } from 'src/shared/logger';
import { Container } from 'typedi';

export function RouteResolver(router: Router, controller: any) {
  const prefix = Reflect.getMetadata('prefix', controller) ?? '';
  for (const key of Object.getOwnPropertyNames(
    Object.getPrototypeOf(controller),
  )) {
    if (key === 'constructor') continue;
    const method: 'get' | 'post' | 'put' | 'patch' | 'delete' =
      Reflect.getMetadata('method', controller, key);
    const path: string = Reflect.getMetadata('path', controller, key) ?? '/';
    if (!method) continue;
    const fullPath = `${prefix}${path === '/' && prefix.length ? '' : path}`;
    router[method](
      fullPath,
      controller[key][Symbol.toStringTag] === 'AsyncFunction'
        ? async (req, res, next) =>
            await controller[key](req, res, next).catch(next)
        : controller[key],
    );
    Container.get(Logger).log({
      header: 'RouteResolver',
      message: `Mapped ${method.toUpperCase()} to ${fullPath}`,
    });
  }
}
