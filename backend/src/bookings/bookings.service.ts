import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../entities/booking.entity';
import { Ground } from '../entities/ground.entity';
import { User } from '../entities/user.entity';
import { CreateBookingDto } from './bookings.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Ground)
    private groundRepository: Repository<Ground>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, createBookingDto: CreateBookingDto) {
    const { groundId, date, startTime, endTime, notes } = createBookingDto;

    // Find ground and user
    const ground = await this.groundRepository.findOne({ 
      where: { id: groundId },
      relations: ['club']
    });
    
    if (!ground) {
      throw new Error('Ground not found');
    }

    const user = await this.userRepository.findOne({ 
      where: { id: userId }
    });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Calculate total price (simplified calculation)
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    const hours = endHour - startHour;
    const totalPrice = Number(ground.pricePerHour) * hours;

    // Create booking
    const booking = this.bookingRepository.create({
      date: new Date(date),
      startTime,
      endTime,
      totalPrice,
      status: BookingStatus.CONFIRMED,
      notes,
      user,
      ground,
    });

    return this.bookingRepository.save(booking);
  }

  async findUserBookings(userId: number) {
    return this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['ground', 'ground.club'],
      order: { date: 'DESC', startTime: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.bookingRepository.findOne({
      where: { id },
      relations: ['ground', 'ground.club', 'user'],
    });
  }

  async updateStatus(id: number, status: BookingStatus) {
    await this.bookingRepository.update(id, { 
      status,
      updatedAt: new Date()
    });
    
    return this.findOne(id);
  }
}