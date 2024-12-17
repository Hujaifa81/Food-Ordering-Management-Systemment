import { Controller, Post, Body, Get, Param, Patch, Put } from '@nestjs/common';
import { NotificationSystemService } from './notification-system.service';
import { CreateNotificationDto } from 'src/dtos/createNotification.dto';

@Controller('notificationSystem')
export class NotificationSystemController {
  constructor(private notificationSystemService: NotificationSystemService) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: number,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationSystemService.create(userId, createNotificationDto);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: number) {
    return this.notificationSystemService.findAll(userId);
  }

  @Put('mark-as-read/:id')
  async markAsRead(@Param('id') id: number) {
    return this.notificationSystemService.markAsRead(id);
  }
}
