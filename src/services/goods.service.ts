import { Container, Service } from 'typedi';
import { DataSource } from 'typeorm';

@Service()
export class GoodsService {
  private readonly db = Container.get<DataSource>('db');
}
