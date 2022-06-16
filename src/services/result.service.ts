import { Result } from 'src/shared/entities/result/result.entity';
import { Container, Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';

@Service()
export class ResultService {
  repogitory: Repository<Result>;
  private readonly db = Container.get<DataSource>('db');
  
  constructor() {
    this.repogitory = this.db.getRepository(Result);
  }

  getResults() {
    return this.repogitory.find();
  }

  getResult(clubId: number) {
    return this.repogitory.findOneBy({ clubId });
  }

  postResult({
    
  }) {
    
  }

  patchResult({

  }) {
    
  }

  deleteResult(clubId: number) {
    return this.repogitory.delete({ clubId });
  }
}
