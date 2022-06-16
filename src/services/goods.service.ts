import { Request, Response } from 'express';
import { GoodsApplication } from 'src/shared/entities/goods-application/goods-application.entity';
import { User } from 'src/shared/entities/user/user.entity';
import {
  BadRequestException,
} from 'src/shared/exceptions';
import { Inject, Service } from 'typedi';
import { DataSource } from 'typeorm';

@Service()
export class GoodsService {
  constructor(@Inject('db') private readonly db: DataSource) {}

  async getGoods(key: string, query: Request['query']) {
    const user = (await this.db
      .getRepository(User)
      .createQueryBuilder()
      .select()
      .where('code = :code', { code: key })
      .getOne())!;

    const qb = this.db
      .getRepository(GoodsApplication)
      .createQueryBuilder('goods')
      .select()
      .leftJoinAndSelect('goods.club', 'club');
    if (user.userType === 'CLUB') qb.where('club.code = :code', { code: key });

    const goods = await qb.getManyAndCount();
    return {
      count: goods[1],
      goods: goods[0].map((g) => ({
        clubName: g.club.name,
        applicant: g.club.chargeName,
        product: g.goodsName,
        url: g.url,
        applicatedAt: g.createdAt,
        returnedAt: g.returnedAt,
        isReturned: g.isReturned,
      })),
    };
  }
}
