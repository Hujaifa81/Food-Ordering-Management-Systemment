import { IsNumber, IsString, Min } from "class-validator";

export class CreateMenuItemDto {
    @IsString()
    name?: string;
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;
    @IsNumber()
    categoryId:number;
    
  }
  