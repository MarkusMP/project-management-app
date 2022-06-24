import { IsOptional } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;
}
