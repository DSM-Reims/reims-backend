export const Prefix = (prefix?: string) => {
  return (target: Function) => {
    Reflect.defineMetadata('prefix', prefix, target.prototype);
  };
};
