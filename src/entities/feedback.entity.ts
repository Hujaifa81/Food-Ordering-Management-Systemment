import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { MenuItem } from './menu-item.entity';


@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  comment: string; // Customer feedback

  @Column({ type: 'int', default: 5 })
  rating: number; // Rating (e.g., 1-5 stars)

  @CreateDateColumn()
  createdAt: Date; // Feedback submission timestamp

  @ManyToOne(() => Customer, (customer) => customer.feedbacks, { onDelete: 'CASCADE' })
  customer: Customer; // Feedback is linked to a specific customer

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.feedbacks, { nullable: true })
  menuItem: MenuItem; // Optional: Feedback can be linked to a specific menu item
}
