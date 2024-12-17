import { IsString, IsNotEmpty  } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  contact: string;
}
