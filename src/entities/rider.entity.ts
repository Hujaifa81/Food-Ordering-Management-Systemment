import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.rider) // Bidirectional relationship with User
  @JoinColumn() // Foreign key column in Rider entity
  user: User;

  @Column()
  vehicleDetails: string; // Rider-specific fields
  @OneToMany(() => Order, (order) => order.rider)
  orders: Order[];
}
