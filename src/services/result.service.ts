import { PatchResultQueryDto } from 'src/dtos/request/patch-result.dto';
import { PostResultQueryDto } from 'src/dtos/request/post-result.dto';
import { VoteQueryDto } from 'src/dtos/request/vote.dto';
import { Result } from 'src/shared/entities/result/result.entity';
import { Vote } from 'src/shared/entities/vote/vote.entity';
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

  voteResult(data: VoteQueryDto & { userId: number; }) {
    return this.db.getRepository(Vote).save({ userId: data.userId, clubId: data.club_id });
  }

  postResult(data: PostResultQueryDto & { clubId: number; }) {
    return this.repogitory.save({
      clubId: data.clubId,
      name: data.title,
      description: data.content,
    });
  }

  patchResult({
    title: name,
    content: description,
    clubId,
  }: PatchResultQueryDto & { clubId: number; }) {
    const data = { clubId, name, description };
    return this.repogitory.save(data);
  }

  deleteResult(clubId: number) {
    return this.repogitory.delete({ clubId });
  }
}
