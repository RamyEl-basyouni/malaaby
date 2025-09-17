import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { Club } from '../entities/club.entity';
import { Ground, SportType, GroundType } from '../entities/ground.entity';
import { Review } from '../entities/review.entity';
import { Booking, BookingStatus } from '../entities/booking.entity';

@Injectable()
export class DatabaseSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Ground)
    private groundRepository: Repository<Ground>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    // Check if data already exists
    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      console.log('Data already seeded');
      return;
    }

    console.log('Seeding database...');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user1 = this.userRepository.create({
      email: 'john@example.com',
      password: hashedPassword,
      name: 'John Doe',
      phone: '+1234567890',
    });

    const user2 = this.userRepository.create({
      email: 'jane@example.com',
      password: hashedPassword,
      name: 'Jane Smith',
      phone: '+1234567891',
    });

    await this.userRepository.save([user1, user2]);

    // Create sample clubs
    const club1 = this.clubRepository.create({
      name: 'Elite Sports Club',
      description: 'Premium sports facility with modern amenities and professional grounds.',
      address: '123 Sports Ave, Cairo, Egypt',
      latitude: 30.0444,
      longitude: 31.2357,
      images: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
      ],
      facilities: ['Parking', 'Locker Rooms', 'Cafeteria', 'WiFi', 'Air Conditioning'],
      rating: 4.8,
      reviewCount: 245,
    });

    const club2 = this.clubRepository.create({
      name: 'Champions Arena',
      description: 'State-of-the-art sports complex for professional and amateur players.',
      address: '456 Victory Rd, Giza, Egypt',
      latitude: 30.0131,
      longitude: 31.2089,
      images: [
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
        'https://images.unsplash.com/photo-1551727460-8b4b6e7e64f8'
      ],
      facilities: ['Parking', 'Locker Rooms', 'Pro Shop', 'Restaurant', 'Fitness Center'],
      rating: 4.6,
      reviewCount: 189,
    });

    const club3 = this.clubRepository.create({
      name: 'City Sports Center',
      description: 'Community-friendly sports center with affordable rates and quality facilities.',
      address: '789 Community St, Alexandria, Egypt',
      latitude: 31.2001,
      longitude: 29.9187,
      images: [
        'https://images.unsplash.com/photo-1556056504-5c7696c4c28d',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b'
      ],
      facilities: ['Parking', 'Locker Rooms', 'Snack Bar', 'Equipment Rental'],
      rating: 4.2,
      reviewCount: 156,
    });

    await this.clubRepository.save([club1, club2, club3]);

    // Create sample grounds
    const ground1 = this.groundRepository.create({
      name: 'Football Pitch A',
      sportType: SportType.FOOTBALL,
      groundType: GroundType.GRASS,
      pricePerHour: 150.00,
      images: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7'
      ],
      description: 'Professional grass football pitch with floodlights',
      availableHours: ['06:00', '07:00', '08:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
      club: club1,
    });

    const ground2 = this.groundRepository.create({
      name: 'Tennis Court 1',
      sportType: SportType.TENNIS,
      groundType: GroundType.CLAY,
      pricePerHour: 80.00,
      images: [
        'https://images.unsplash.com/photo-1544737151-6e4b1999de7a',
        'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0'
      ],
      description: 'Professional clay tennis court',
      availableHours: ['06:00', '07:00', '08:00', '09:00', '16:00', '17:00', '18:00', '19:00'],
      club: club1,
    });

    const ground3 = this.groundRepository.create({
      name: 'Football Pitch B',
      sportType: SportType.FOOTBALL,
      groundType: GroundType.ARTIFICIAL,
      pricePerHour: 120.00,
      images: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018'
      ],
      description: 'Artificial turf football pitch',
      availableHours: ['06:00', '07:00', '08:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      club: club2,
    });

    const ground4 = this.groundRepository.create({
      name: 'Volleyball Court',
      sportType: SportType.VOLLEYBALL,
      groundType: GroundType.SAND,
      pricePerHour: 100.00,
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0401ba94772',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
      ],
      description: 'Beach volleyball court with sand surface',
      availableHours: ['07:00', '08:00', '09:00', '16:00', '17:00', '18:00', '19:00'],
      club: club2,
    });

    const ground5 = this.groundRepository.create({
      name: 'Community Football',
      sportType: SportType.FOOTBALL,
      groundType: GroundType.GRASS,
      pricePerHour: 90.00,
      images: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256'
      ],
      description: 'Community football pitch',
      availableHours: ['06:00', '07:00', '08:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
      club: club3,
    });

    await this.groundRepository.save([ground1, ground2, ground3, ground4, ground5]);

    // Create sample reviews
    const review1 = this.reviewRepository.create({
      rating: 5,
      comment: 'Excellent facilities and well-maintained grounds!',
      user: user1,
      club: club1,
    });

    const review2 = this.reviewRepository.create({
      rating: 4,
      comment: 'Great place to play. Good value for money.',
      user: user2,
      club: club1,
    });

    const review3 = this.reviewRepository.create({
      rating: 5,
      comment: 'Professional setup, highly recommended!',
      user: user1,
      club: club2,
    });

    await this.reviewRepository.save([review1, review2, review3]);

    // Create sample bookings
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const booking1 = this.bookingRepository.create({
      date: tomorrow,
      startTime: '18:00',
      endTime: '19:00',
      totalPrice: 150.00,
      status: BookingStatus.CONFIRMED,
      notes: 'Regular weekly booking',
      user: user1,
      ground: ground1,
    });

    const booking2 = this.bookingRepository.create({
      date: nextWeek,
      startTime: '19:00',
      endTime: '20:00',
      totalPrice: 80.00,
      status: BookingStatus.CONFIRMED,
      notes: 'Tennis practice session',
      user: user2,
      ground: ground2,
    });

    await this.bookingRepository.save([booking1, booking2]);

    console.log('Database seeded successfully!');
  }
}