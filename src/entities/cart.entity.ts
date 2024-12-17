import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { CartItem } from "./cartItem.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.carts)
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
totalAmount: number;
}
