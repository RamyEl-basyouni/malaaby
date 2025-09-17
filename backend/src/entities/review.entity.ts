import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Club } from './club.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  rating: number; // 1-5 stars

  @Column('text')
  comment: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Club, club => club.reviews)
  club: Club;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}