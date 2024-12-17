import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CheckoutCartDto {
  @IsNotEmpty()
  @IsNumber()
  cartId: number; // The cart that is being checked out

  @IsArray()
  @IsNotEmpty()
  menuItemIds: number[]; // The list of menu items in the cart

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number; // Total amount after any discounts or offers applied

  @IsNotEmpty()
  @IsNumber()
  customerId: number; // The customer placing the order

  @IsNotEmpty()
  deliveryAddress: string; // Address to deliver the order

  @IsNotEmpty()
  deliveryDate: Date; // Date and time of delivery
}
