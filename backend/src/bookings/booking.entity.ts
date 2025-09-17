import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Ground } from '../clubs/ground.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  startTime: Date;

  @Column('datetime')
  endTime: Date;

  @Column('decimal', { precision: 8, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'varchar',
    enum: BookingStatus,
    default: BookingStatus.PENDING
  })
  status: BookingStatus;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @ManyToOne(() => Ground, ground => ground.bookings)
  ground: Ground;
}