import { IsOptional, IsNumber, IsPositive, IsString, IsEnum, IsDateString } from 'class-validator';

export class UpdatePaymentDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    orderId: number;
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount?: number;  // The payment amount

    @IsOptional()
    @IsString()
    paymentStatus?: string;  // Payment status (e.g., 'Paid', 'Failed')

    @IsOptional()
    @IsString()
    paymentMethod?: string;  // Payment method (e.g., 'Credit Card', 'Cash on Delivery')

    @IsOptional()
    @IsDateString()
    paymentDate?: Date;  // The date the payment was made
}
