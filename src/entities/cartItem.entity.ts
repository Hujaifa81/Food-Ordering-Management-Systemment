import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { MenuItem } from "./menu-item.entity";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.cartItems)
  @JoinColumn({ name: 'menu_item_id' })
  menuItem: MenuItem;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; 
}
