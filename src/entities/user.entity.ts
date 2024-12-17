import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { Admin } from './admin.entity'; // Import Admin if you want to include
import { Rider } from './rider.entity'; // Import Rider if you want to include
import { NotificationSystem } from './notificationSystem.entity';

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
    BANNED = 'banned',
  }
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string
    
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column(({ type: 'varchar', length: 20 }))
    role: string;
    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.PENDING, // Default status is ACTIVE
      })
    status: UserStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date;

    @OneToOne(() => Customer, (customer) => customer.user) // Bidirectional reference to Customer
    customer: Customer;

    @OneToOne(() => Admin, (admin) => admin.user) // Similarly for Admin
    admin: Admin;

    @OneToOne(() => Rider, (rider) => rider.user) // Similarly for Rider
    rider: Rider;
    @Column({ type: 'boolean', default: true })
  emailNotifications: boolean; // Email notification preference

  @Column({ type: 'boolean', default: true })
  smsNotifications: boolean; // SMS notification preference

  @Column({ type: 'boolean', default: true })
  inAppNotifications: boolean; // In-app notification preference

  @OneToMany(() => NotificationSystem, (notificationSystem) => notificationSystem.user)
  notificationSystems: NotificationSystem[]; // Notifications linked to the user
    
}
