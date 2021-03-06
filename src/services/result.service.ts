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
    return this.repogitory.find({ relations: ["club"] });
      // .createQueryBuilder()
      // .leftJoin("vote", "Vote")
      // .addSelect("COUNT(Vote)", "voteCount")
      // .where("Vote.voted_id = Result.club_id")
      // .getMany();
  }

  getResult(clubId: number) {
    return this.repogitory.findOneBy({ clubId });
  }

  getVoteCount(clubId: number) {
    return this.db.getRepository(Vote).count({ where: { votedId: clubId } });
  }

  voteResult(data: VoteQueryDto & { userId: number; }) {
    return this.db.getRepository(Vote).insert({ userId: data.userId, votedId: data.club_id });
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
    return this.repogitory.save({ ...data });
  }

  deleteResult(clubId: number) {
    return this.repogitory.delete({ clubId });
  }
}
