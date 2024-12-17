import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.admin) // Bidirectional relationship with User
  @JoinColumn() // Foreign key column in Admin entity
  user: User;

  @Column()
  permissions: string; // Additional Admin-specific fields
}
