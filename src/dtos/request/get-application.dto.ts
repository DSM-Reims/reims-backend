import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class GetApplicationQueryDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page!: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit!: number;

  @IsUUID('4', { each: true })
  @IsOptional()
  filter?: string[];
}
