import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { statusEnum } from './enums';

export class UpdateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsEnum(statusEnum)
  status: statusEnum;
}
