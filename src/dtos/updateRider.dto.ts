import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateRiderDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  userId?: number; // Optional: ID of the associated user (can be updated)

  @IsString()
  @IsOptional()
  vehicleDetails?: string; // Optional: Details of the rider's vehicle (can be updated)
}
