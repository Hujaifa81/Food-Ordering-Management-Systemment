import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { Customer } from 'src/entities/customer.entity';
import { MenuItem } from 'src/entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem,Customer,Feedback])],
  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule {}
