import { IsString, IsNotEmpty, IsOptional  } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contact?: string;
}
