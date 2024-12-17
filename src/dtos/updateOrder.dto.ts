import { IsNumber, IsPositive, IsNotEmpty, IsArray, ArrayNotEmpty, IsInt, IsOptional, IsEnum, IsString } from "class-validator";

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  customerId: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  orderDate?: Date;     // Optional, can be omitted
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  menuItemIds?: number[];
  @IsOptional()
  @IsEnum(['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'])
  status?: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  @IsOptional()
  @IsNumber()
  riderId?: number;
  @IsOptional()
  @IsString()
  paymentMethod?: string; // Optional: Update payment method
  @IsOptional()
  @IsString()
  deliveryAddress?: string; 

}