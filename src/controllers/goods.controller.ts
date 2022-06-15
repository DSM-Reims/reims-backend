import { Request, Response, NextFunction } from 'express';
import { GoodsService } from 'src/services/goods.service';
import {
  Delete,
  Get,
  Patch,
  Post,
} from 'src/shared/decorators/http-method.decorator';
import { Prefix } from 'src/shared/decorators/prefix.decorator';
import { ValidateApiKey } from 'src/shared/decorators/validate-key.decorator';
import { Inject, Service } from 'typedi';

@Service()
@Prefix('/goods')
export class GoodsController {
  constructor(private readonly service: GoodsService) {}

  @Post()
  @ValidateApiKey()
  async createGoodsApplication(req: Request, res: Response) {}

  @Get()
  @ValidateApiKey()
  async getGoods(req: Request, res: Response) {}

  @Patch('/return/:goods_uuid')
  @ValidateApiKey('TEACHER')
  async updateReturned(req: Request, res: Response) {}

  @Delete('/:goods_uuid')
  @ValidateApiKey()
  async deleteApplication(req: Request, res: Response) {}

  @Get('/applicated_clubs')
  @ValidateApiKey('TEACHER')
  async getApplicatedClubs(req: Request, res: Response) {}
}
