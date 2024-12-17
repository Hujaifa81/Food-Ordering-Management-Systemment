import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { MenuItem } from './menu-item.entity';


@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // e.g., "New Year Discount"

  @Column('decimal', { precision: 5, scale: 2 })
  discountPercentage: number; // e.g., 20 for 20%

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.offers)
  @JoinTable()
  menuItems: MenuItem[];

  
}
