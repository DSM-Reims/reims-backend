import type * as express from 'express';
import * as typeormLoader from './typeorm';
import * as expressLoader from './express';

export const init = async (app: express.Application) => {
  await typeormLoader.init();
};
