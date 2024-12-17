import { IsNotEmpty, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number; // Customer associated with the cart

  @IsOptional()
  @IsArray()
  menuItemIds: number[]; // List of MenuItem IDs the customer is adding to the cart
}
