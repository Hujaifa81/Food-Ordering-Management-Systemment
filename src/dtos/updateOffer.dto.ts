import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsArray, IsInt, Min, Max, IsDefined } from 'class-validator';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  title?: string; // Update the title of the offer

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage?: number; // Update the discount percentage

  @IsOptional()
  @IsDate()
  startDate?: Date; // Update the start date of the offer

  @IsOptional()
  @IsDate()
  endDate?: Date; // Update the end date of the offer

  @IsOptional()
  @IsBoolean()
  active?: boolean; // Activate or deactivate the offer

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  menuItemIds?: number[]; // Update associated menu items

  
}
