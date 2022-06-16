import { Request, Response } from 'express';
import { ResultService } from 'src/services/result.service';
import { Get } from 'src/shared/decorators/http-method.decorator';
import { Prefix } from 'src/shared/decorators/prefix.decorator';
import { Service } from 'typedi';

@Service()
@Prefix("/results")
export class ResultController {
  constructor(private readonly service: ResultService) {}

  @Get()
  async getResults(_req: Request, res: Response) {
    const result = await this.service.getResults();
    res.status(200).json(result);
  }
}
