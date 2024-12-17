import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsDate, IsInt, Min, Max, ArrayNotEmpty } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  menuItemIds: number[];

  
}
