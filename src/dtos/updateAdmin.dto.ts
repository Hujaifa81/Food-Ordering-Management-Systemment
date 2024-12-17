import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsOptional() // Allows this field to be omitted in the update request
  @IsNotEmpty()
  permissions?: string; // Updated permissions for the admin
}
