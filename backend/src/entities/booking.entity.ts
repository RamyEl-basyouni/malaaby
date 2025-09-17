import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Ground } from './ground.entity';

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

  @Column({ type: 'date' })
  date: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column('decimal', { precision: 8, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'simple-enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING
  })
  status: BookingStatus;

  @Column('text', { nullable: true })
  notes: string;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @ManyToOne(() => Ground, ground => ground.bookings)
  ground: Ground;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}