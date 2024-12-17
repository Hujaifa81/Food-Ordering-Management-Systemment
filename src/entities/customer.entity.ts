import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';
import { Payment } from './payment.entity';
import { Feedback } from './feedback.entity';
import { Cart } from './cart.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.customer) // Bidirectional relationship
  @JoinColumn() // Foreign key column in Customer entity
  user: User;

  @Column()
  address: string;

  @Column()
  contact: string

  @OneToMany(() => Order, (order) => order.customer)  // One customer can have many orders
  orders: Order[];
  @OneToMany(() => Feedback, (feedback) => feedback.customer)
  feedbacks: Feedback[];
  @OneToMany(() => Cart, (cart) => cart.customer)
  carts: Cart[]; // A customer can have many carts



}
