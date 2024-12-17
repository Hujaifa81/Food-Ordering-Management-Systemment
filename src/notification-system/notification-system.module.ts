import { Module } from '@nestjs/common';
import { NotificationSystemService } from './notification-system.service';
import { NotificationSystemController } from './notification-system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationSystem } from 'src/entities/notificationSystem.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationSystem,User])],
  providers: [NotificationSystemService],
  controllers: [NotificationSystemController],
  exports: [NotificationSystemService, TypeOrmModule],
})
export class NotificationSystemModule {}
