import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Club } from './club.entity';
import { Booking } from '../bookings/booking.entity';

@Entity()
export class Ground {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // 'football', 'tennis', etc.

  @Column('decimal', { precision: 8, scale: 2 })
  pricePerHour: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column()
  image: string;

  @ManyToOne(() => Club, club => club.grounds)
  club: Club;

  @OneToMany(() => Booking, booking => booking.ground)
  bookings: Booking[];
}