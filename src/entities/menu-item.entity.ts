import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Category } from './category.entity';
import { Feedback } from './feedback.entity';
import { Offer } from './offer.entity';
import { CartItem } from './cartItem.entity';

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 }) // Use decimal for prices
    price: number;

    @ManyToMany(() => Order, (order) => order.menuItems)
    @JoinTable()
    orders: Order[];
    @ManyToOne(() => Category, (category) => category.menuItems)
    @JoinColumn()
    category: Category;
    @OneToMany(() => Feedback, (feedback) => feedback.menuItem)
    feedbacks: Feedback[];
    @ManyToMany(() => Offer, (offer) => offer.menuItems)
    offers: Offer[];
    @OneToMany(() => CartItem, (cartItem) => cartItem.menuItem)
  cartItems: CartItem[]; // A menu item can be added to multiple carts


}
