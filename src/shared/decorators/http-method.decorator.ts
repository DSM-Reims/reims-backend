export function Get(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    defineMetadata(target, propertyKey, 'get', path);
  };
}

export function Post(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    defineMetadata(target, propertyKey, 'post', path);
  };
}

export function Put(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    defineMetadata(target, propertyKey, 'put', path);
  };
}

export function Patch(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    defineMetadata(target, propertyKey, 'patch', path);
  };
}

export function Delete(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {
    defineMetadata(target, propertyKey, 'delete', path);
  };
}

const defineMetadata = (
  target: any,
  propertyKey: string,
  method: string,
  path?: string,
) => {
  Reflect.defineMetadata('method', method, target, propertyKey);
  Reflect.defineMetadata('path', path, target, propertyKey);
};
