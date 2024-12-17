import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateAdminDto {

  @IsString()
  @IsNotEmpty()
  permissions: string;
}
