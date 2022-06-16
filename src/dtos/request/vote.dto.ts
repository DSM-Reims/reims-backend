import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class VoteQueryDto {
  @IsNumber()
  @Type(() => Number)
  club_id!: number;
}
