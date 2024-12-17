import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from 'src/dtos/createNotification.dto';
import { NotificationSystem } from 'src/entities/notificationSystem.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class NotificationSystemService {
  constructor(
    @InjectRepository(NotificationSystem)
    private notificationSystemRepository: Repository<NotificationSystem>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, createNotificationDto: CreateNotificationDto): Promise<NotificationSystem> {
    const user = await this.userRepository.findOne({where: { id: userId }});
    if (!user) {
      throw new Error('User not found');
    }

    const notificationSystem = this.notificationSystemRepository.create({
      ...createNotificationDto,
      user,
    });
    return this.notificationSystemRepository.save(notificationSystem);
  }

  async findAll(userId: number): Promise<NotificationSystem[]> {
    return this.notificationSystemRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(notificationSystemId: number): Promise<NotificationSystem> {
    const notificationSystem = await this.notificationSystemRepository.findOne({where: { id: notificationSystemId }});
    if (!notificationSystem) {
      throw new Error('Notification not found');
    }

    notificationSystem.read = true;
    return this.notificationSystemRepository.save(notificationSystem);
  }
}
