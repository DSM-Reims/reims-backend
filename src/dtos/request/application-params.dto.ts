import { IsUUID } from 'class-validator';

export class ApplicationParamsDto {
  @IsUUID()
  applicationUUID!: string;
}
