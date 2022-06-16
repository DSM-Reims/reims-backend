import { Type } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

export class PatchResultQueryDto {
  @IsString()
  @MaxLength(20)
  @Type(() => String)
  title?: string;

  @IsString()
  @MaxLength(100)
  @Type(() => String)
  content?: string;
}
