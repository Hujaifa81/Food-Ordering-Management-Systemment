import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class NotificationSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string; // Notification content

  @Column({ type: 'boolean', default: false })
  read: boolean; // Read/unread status

  @Column({ type: 'varchar', length: 20 })
  type: string; // e.g., 'Order Update', 'Promotion'

  @CreateDateColumn()
  createdAt: Date; // Timestamp for notification creation

  @ManyToOne(() => User, (user) => user.notificationSystems)
  user: User; // Link notification to a specific user
}
