import { IsNumber, IsString, IsPositive, IsEnum, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsPositive()
  orderId: number;  // The order ID to which this payment is linked

  @IsNumber()
  @IsPositive()
  amount: number;  // The payment amount

  @IsString()
  paymentStatus: string;  // Payment status (e.g., 'Paid', 'Pending')

  @IsString()
  paymentMethod: string;  // Payment method (e.g., 'Credit Card', 'Cash on Delivery')

  @IsDateString()
  paymentDate: Date;  // The date the payment was made
}
