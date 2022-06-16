import { Request, Response, NextFunction } from 'express';
import { CreateApplicationRequestDto } from 'src/dtos/request/create-application.dto';
import { GetApplicationQueryDto } from 'src/dtos/request/get-application.dto';
import { GoodsService } from 'src/services/goods.service';
import {
  Delete,
  Get,
  Patch,
  Post,
} from 'src/shared/decorators/http-method.decorator';
import { Prefix } from 'src/shared/decorators/prefix.decorator';
import { ValidateApiKey } from 'src/shared/decorators/validate-key.decorator';
import {
  ValidateBody,
  ValidateQuery,
} from 'src/shared/decorators/validator.decorator';
import { Inject, Service } from 'typedi';

@Service()
@Prefix('/goods')
export class GoodsController {
  constructor(private readonly service: GoodsService) {}

  @Post()
  @ValidateApiKey()
  @ValidateBody(CreateApplicationRequestDto)
  async createGoodsApplication(req: Request, res: Response) {
    res.send(
      await this.service.createApplication(
        req.headers['x-api-key'] as string,
        req.body,
      ),
    );
  }

  @Get()
  @ValidateApiKey()
  @ValidateQuery(GetApplicationQueryDto)
  async getGoods(req: Request, res: Response) {
    res.send(
      await this.service.getGoods(
        req.headers['x-api-key'] as string,
        req.query,
      ),
    );
  }

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
