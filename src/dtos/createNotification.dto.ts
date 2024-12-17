import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  type: string; // Notification type

  @IsOptional()
  @IsBoolean()
  read?: boolean; // Default is false
}
