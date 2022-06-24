import { IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;
}
