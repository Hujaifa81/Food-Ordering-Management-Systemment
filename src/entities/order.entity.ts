import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { MenuItem } from "./menu-item.entity";
import { Rider } from "./rider.entity";
import { Payment } from "./payment.entity";
import { IsString } from "class-validator";


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending',
  })
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  @ManyToOne(() => Rider, (rider) => rider.orders, { nullable: true })
  @JoinColumn()
  rider: Rider;

  @ManyToOne(() => Customer, (customer) => customer.orders,
    {
      //onDelete: 'CASCADE',  // Automatically delete associated orders when a customer is deleted
    })  // Many orders belong to one customer
  @JoinColumn()  
  customer: Customer;
  @ManyToMany(() => MenuItem, (menuItem) => menuItem.orders)
  menuItems: MenuItem[];
  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];  
  @IsString()
  deliveryAddress: string; 

}
