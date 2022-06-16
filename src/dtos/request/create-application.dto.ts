import { IsOptional, IsString, Length } from 'class-validator';

export class CreateApplicationRequestDto {
  @IsString()
  @Length(1, 30)
  goodsName!: string;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  clubName?: string;
}
