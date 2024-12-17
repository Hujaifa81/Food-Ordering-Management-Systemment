import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateOrderDto {

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  customerId?: number;   // ID of the associated customer
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsInt({ each: true })
  // menuItemIds?: number[];
  @IsOptional()
  @IsString()
  paymentMethod?: string; //
  @IsOptional()
  @IsString()
  deliveryAddress?: string; 
  
  
}
