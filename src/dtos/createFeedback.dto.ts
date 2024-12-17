import { IsNotEmpty, IsInt, IsString, Min, Max, IsOptional } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  customerId: number;

  @IsOptional() // MenuItem is optional
  menuItemId?: number;
}
