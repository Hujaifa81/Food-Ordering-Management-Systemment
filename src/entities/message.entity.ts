import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn()
  receiver: User;

  @Column('text')
  message: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @Column('boolean', { default: false })
  read: boolean;
}
