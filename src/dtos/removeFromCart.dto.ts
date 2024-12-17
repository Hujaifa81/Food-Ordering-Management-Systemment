import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveFromCartDto {
  @IsNotEmpty()
  @IsNumber()
  cartId: number; // The ID of the cart from which the item will be removed

  @IsNotEmpty()
  @IsNumber()
  menuItemId: number; // The ID of the menu item to remove
}
