import { IsInt, IsPositive, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsInt({ message: 'CartItem ID must be an integer' })
  @IsPositive({ message: 'CartItem ID must be a positive number' })
  cartItemId: number;

  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
