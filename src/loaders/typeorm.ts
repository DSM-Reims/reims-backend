import express from 'express';
import { dataSourceOptions } from 'src/ormconfig';
import { Logger } from 'src/shared/logger';
import { Container } from 'typedi';
import { DataSource } from 'typeorm';

export const init = async (app: express.Application) => {
  const AppDataSource = new DataSource(
    dataSourceOptions[process.env.NODE_ENV!],
  );
  await AppDataSource.initialize();
  Container.set('db', AppDataSource);
  Container.get(Logger).log({
    header: 'TypeORMInitializer',
    message: 'TypeORM Successfully initialized',
  });
};
