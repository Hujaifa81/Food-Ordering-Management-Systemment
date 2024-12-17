import { IsInt, IsPositive, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt({ message: 'MenuItem ID must be an integer' })
  @IsPositive({ message: 'MenuItem ID must be a positive number' })
  menuItemId: number;

  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
