import { Request, Response } from 'express';
import { Delete, Get, Patch, Post } from 'src/shared/decorators/http-method.decorator';
import { Prefix } from 'src/shared/decorators/prefix.decorator';
import { ValidateApiKey } from 'src/shared/decorators/validate-key.decorator';
import { Service } from 'typedi';

@Service()
@Prefix("/users")
export class UsersController {
  constructor() {}

  @Get()
  @ValidateApiKey()
  async getUser(req: Request, res: Response) {
    res.status(200).json(req.user);
  }
}
