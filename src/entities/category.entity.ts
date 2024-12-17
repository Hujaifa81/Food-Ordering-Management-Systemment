import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MenuItem } from './menu-item.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.category)
  menuItems: MenuItem[];
}
