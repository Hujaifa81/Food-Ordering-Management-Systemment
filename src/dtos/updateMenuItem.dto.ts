import { IsNumber, IsString, Min } from "class-validator";

export class UpdateMenuItemDto {
    @IsString()
    name?: string;
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;
    @IsNumber()
    categoryId: number;
}
