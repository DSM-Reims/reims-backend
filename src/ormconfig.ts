import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { GoodsApplication } from './shared/entities/goods-application/goods-application.entity';
import { Result } from './shared/entities/result/result.entity';
import { User } from './shared/entities/user/user.entity';
import { Vote } from './shared/entities/vote/vote.entity';

export const dataSourceOptions: { [key: string]: DataSourceOptions } = {
  development: {
    type: 'postgres',
    host: process.env.DEV_DB_HOST,
    port: +process.env.DEV_DB_PORT!,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    entities: [GoodsApplication, Result, User, Vote],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: true,
  },
  production: {
    type: 'postgres',
    host: process.env.PROD_DB_HOST,
    port: +process.env.PROD_DB_PORT!,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    entities: [GoodsApplication, Result, User, Vote],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    logging: false,
  },
};
