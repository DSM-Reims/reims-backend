import { Request, Response } from 'express';
import { PatchResultQueryDto } from 'src/dtos/request/patch-result.dto';
import { PostResultQueryDto } from 'src/dtos/request/post-result.dto';
import { ResultService } from 'src/services/result.service';
import { Delete, Get, Patch, Post } from 'src/shared/decorators/http-method.decorator';
import { SingleMultipartData } from 'src/shared/decorators/multipart-data.decorator';
import { Prefix } from 'src/shared/decorators/prefix.decorator';
import { ValidateApiKey } from 'src/shared/decorators/validate-key.decorator';
import { ValidateBody } from 'src/shared/decorators/validator.decorator';
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

  @Get("/:result_id")
  async getResult(req: Request, res: Response) {
    const result = await this.service.getResult(req.params.result_id as unknown as number);
    res.status(200).json(result);
  }

  @Get("/vote/:result_id")
  async getVoteCount(req: Request, res: Response) {
    const result = await this.service.getVoteCount(req.params.result_id as unknown as number);
    res.status(200).json(result);
  }

  @Post()
  @ValidateApiKey("CLUB")
  @ValidateBody(PostResultQueryDto)
  async uploadResults(req: Request, res: Response) {
    await this.service.postResult({ ...req.body, clubId: req.user!.id });
    res.status(201).json();
  }

  @Post("/vote")
  @ValidateApiKey()
  async voteResult(req: Request, res: Response) {
    await this.service.voteResult({ ...req.body, userId: req.user!.id });
    res.status(201).json();
  }

  @Patch()
  @ValidateApiKey("CLUB")
  @ValidateBody(PatchResultQueryDto)
  async editResult(req: Request, res: Response) {
    await this.service.patchResult({ ...req.body, clubId: req.user!.id });
    res.status(201).json();
  }

  @Patch("/video")
  @ValidateApiKey("CLUB")
  @SingleMultipartData()
  async uploadVideo(_req: Request, res: Response) {
    res.status(201).json();
  }

  @Patch("/picture")
  @ValidateApiKey("CLUB")
  @SingleMultipartData()
  async uploadPicture(_req: Request, res: Response) {
    res.status(201).json();
  }

  @Delete()
  @ValidateApiKey("CLUB")
  async deletePicture(req: Request, res: Response) {
    await this.service.deleteResult(req.user!.id);
    res.status(200).json();
  }
}
