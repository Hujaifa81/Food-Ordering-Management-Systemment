import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn()
  order: Order;  // Link payment to an order

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;  // Payment amount

  @Column({ type: 'varchar', length: 20 })
  paymentStatus: string;  // e.g. 'Paid', 'Failed', 'Pending'

  @Column({ type: 'varchar', length: 50 })
  paymentMethod: string;  // e.g. 'Credit Card', 'Cash on Delivery'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;  // Payment timestamp
}
