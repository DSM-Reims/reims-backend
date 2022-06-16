import { Request, Response } from 'express';
import { CreateApplicationRequestDto } from 'src/dtos/request/create-application.dto';
import { GoodsApplication } from 'src/shared/entities/goods-application/goods-application.entity';
import { User } from 'src/shared/entities/user/user.entity';
import {
  BadRequestException,
  NotFoundException,
} from 'src/shared/exceptions';
import { Inject, Service } from 'typedi';
import { DataSource } from 'typeorm';

@Service()
export class GoodsService {
  constructor(@Inject('db') private readonly db: DataSource) {}

  async createApplication(key: string, payload: CreateApplicationRequestDto) {
    const user = (await this.db
      .getRepository(User)
      .createQueryBuilder()
      .select()
      .where('code = :code', { code: key })
      .getOne())!;
    if (user.userType === 'CLUB') {
      await this.db
        .getRepository(GoodsApplication)
        .createQueryBuilder('goods')
        .insert()
        .values([{ ...payload, club: user, uuid: v4(), description: '' }])
        .execute();
    } else {
      if (!payload.clubName) throw new NotFoundException();
      const club = await this.db
        .getRepository(User)
        .createQueryBuilder()
        .select()
        .where('name = :name', { name: payload.clubName })
        .getOne();
      if (!club) throw new BadRequestException();
      await this.db
        .getRepository(GoodsApplication)
        .createQueryBuilder('goods')
        .insert()
        .values([{ ...payload, club: club, uuid: v4(), description: '' }])
        .execute();
    }
  }

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
