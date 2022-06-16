import { Request, Response } from 'express';
import { CreateApplicationRequestDto } from 'src/dtos/request/create-application.dto';
import { GetApplicationQueryDto } from 'src/dtos/request/get-application.dto';
import { ApplicationParamsDto } from 'src/dtos/request/application-params.dto';
import { GoodsApplication } from 'src/shared/entities/goods-application/goods-application.entity';
import { User } from 'src/shared/entities/user/user.entity';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from 'src/shared/exceptions';
import { Inject, Service } from 'typedi';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';

@Service()
export class GoodsService {
  constructor(@Inject('db') private readonly db: DataSource) {}

  async createApplication(
    user: Request['user'],
    payload: CreateApplicationRequestDto,
  ) {
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

  async getGoods(user: Request['user'], query: GetApplicationQueryDto) {
    if (user.userType === 'CLUB' && query.filter)
      throw new ForbiddenException();
    const { page, limit } = query;
    const qb = this.db
      .getRepository(GoodsApplication)
      .createQueryBuilder('goods')
      .select()
      .leftJoinAndSelect('goods.club', 'club')
      .skip((page - 1) * limit)
      .take(limit);
    if (user.userType === 'CLUB')
      qb.where('club.code = :code', { code: user.code });
    else if (query.filter)
      qb.where(
        `club.uuid IN (:${Array.isArray(query.filter) ? '...uuid' : 'uuid'})`,
        { uuid: query.filter },
      );
    console.log(query.filter);

    const goods = await qb.getManyAndCount();
    return {
      count: goods[1],
      goods: goods[0].map((g) => ({
        uuid: g.uuid,
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

  async updateReturned(user: Request['user'], params: ApplicationParamsDto) {
    if (user.userType !== 'TEACHER') throw new ForbiddenException();
    await this.db
      .getRepository(GoodsApplication)
      .createQueryBuilder()
      .update()
      .set({ isReturned: true, returnedAt: new Date() })
      .where('uuid = :uuid', { uuid: params.applicationUUID })
      .execute();
  }

  async deleteApplication(user: Request['user'], params: ApplicationParamsDto) {
    const application = await this.db
      .getRepository(GoodsApplication)
      .createQueryBuilder('app')
      .select()
      .leftJoinAndSelect('app.club', 'club')
      .where('app.uuid = :uuid', { uuid: params.applicationUUID })
      .getOne();
    if (!application) throw new NotFoundException();
    if (user.userType === 'CLUB' && application.club.code !== user.code)
      throw new ForbiddenException();
    await this.db
      .getRepository(GoodsApplication)
      .createQueryBuilder()
      .delete()
      .where('uuid = :uuid', { uuid: params.applicationUUID })
      .execute();
  }

  async getApplicatedClubs() {
    const subquery = await this.db
      .getRepository(GoodsApplication)
      .createQueryBuilder('app')
      .select('1')
      .where('app.club = club.id');
    const clubs = await this.db
      .getRepository(User)
      .createQueryBuilder('club')
      .where(`EXISTS (${subquery.getQuery()})`)
      .getManyAndCount();

    return {
      count: clubs[1],
      clubs: clubs[0].map((club) => ({
        name: club.name,
        uuid: club.uuid,
      })),
    };
  }
}
