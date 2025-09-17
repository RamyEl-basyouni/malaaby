import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ground } from './ground.entity';
import { Review } from './review.entity';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitude: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  image: string;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @OneToMany(() => Ground, ground => ground.club)
  grounds: Ground[];

  @OneToMany(() => Review, review => review.club)
  reviews: Review[];
}