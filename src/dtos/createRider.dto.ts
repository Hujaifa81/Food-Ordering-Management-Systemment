import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateRiderDto {
  // @IsNumber()
  // @IsPositive()
  // @IsNotEmpty()
  // userId: number; // ID of the associated user

  @IsString()
  @IsNotEmpty()
  vehicleDetails: string; // Details of the rider's vehicle (e.g., "Bike - Yamaha MT-15")
}
