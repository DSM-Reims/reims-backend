import { Request, Response, NextFunction } from 'express';
import { CreateApplicationRequestDto } from 'src/dtos/request/create-application.dto';
import { GetApplicationQueryDto } from 'src/dtos/request/get-application.dto';
import { ApplicationParamsDto } from 'src/dtos/request/application-params.dto';
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

export type CustomRequest<P, B, Q> = Request<P, any, B, Q, Record<string, any>>;
@Service()
@Prefix('/goods')
export class GoodsController {
  constructor(private readonly service: GoodsService) {}

  @Post()
  @ValidateApiKey()
  @ValidateBody(CreateApplicationRequestDto)
  async createGoodsApplication(
    req: CustomRequest<{}, CreateApplicationRequestDto, {}>,
    res: Response,
  ) {
    res.send(await this.service.createApplication(req.user, req.body));
  }

  @Get()
  @ValidateApiKey()
  @ValidateQuery(GetApplicationQueryDto)
  async getGoods(
    req: CustomRequest<{}, {}, GetApplicationQueryDto>,
    res: Response,
  ) {
    res.send(await this.service.getGoods(req.user, req.query));
  }

  @Patch('/return/:applicationUUID')
  @ValidateApiKey('TEACHER')
  async updateReturned(
    req: CustomRequest<ApplicationParamsDto, {}, {}>,
    res: Response,
  ) {
    res.send(await this.service.updateReturned(req.user, req.params));
  }

  @Delete('/:applicationUUID')
  @ValidateApiKey()
  async deleteApplication(
    req: CustomRequest<ApplicationParamsDto, {}, {}>,
    res: Response,
  ) {
    res.send(await this.service.deleteApplication(req.user, req.params));
  }

  @Get('/applicated_clubs')
  @ValidateApiKey('TEACHER')
  async getApplicatedClubs(req: Request, res: Response) {
    res.send(await this.service.getApplicatedClubs());
  }
}
