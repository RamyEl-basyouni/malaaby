import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Club } from '../clubs/club.entity';
import { Ground } from '../clubs/ground.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class DataSeederService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Ground)
    private groundRepository: Repository<Ground>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    // Check if data already exists
    const userCount = await this.usersService.findOne('tetco');
    if (userCount) return;

    // Create seed user
    await this.usersService.create({
      username: 'tetco',
      password: '123456',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+1234567890',
    });

    // Create sample clubs
    const clubs = [
      {
        name: 'Champions Sports Club',
        description: 'Premium sports facility with modern amenities',
        address: '123 Sports Street',
        city: 'Cairo',
        latitude: 30.0444,
        longitude: 31.2357,
        phone: '+201234567890',
        email: 'info@champions.com',
        image: 'https://via.placeholder.com/300x200',
        rating: 4.5,
        reviewCount: 125,
      },
      {
        name: 'Elite Football Academy',
        description: 'Professional football training center',
        address: '456 Elite Avenue',
        city: 'Alexandria',
        latitude: 31.2001,
        longitude: 29.9187,
        phone: '+201234567891',
        email: 'info@elite.com',
        image: 'https://via.placeholder.com/300x200',
        rating: 4.8,
        reviewCount: 89,
      },
      {
        name: 'City Sports Complex',
        description: 'Multi-sport facility in the heart of the city',
        address: '789 City Center',
        city: 'Giza',
        latitude: 30.0131,
        longitude: 31.2089,
        phone: '+201234567892',
        email: 'info@citysports.com',
        image: 'https://via.placeholder.com/300x200',
        rating: 4.2,
        reviewCount: 76,
      },
    ];

    for (const clubData of clubs) {
      const club = await this.clubRepository.save(clubData);
      
      // Add grounds for each club
      const grounds = [
        {
          name: 'Field A',
          type: 'football',
          pricePerHour: 150,
          description: 'Standard football field with grass surface',
          amenities: ['Changing rooms', 'Parking', 'Lighting'],
          image: 'https://via.placeholder.com/300x200',
          club,
        },
        {
          name: 'Field B',
          type: 'football',
          pricePerHour: 200,
          description: 'Premium football field with artificial grass',
          amenities: ['Changing rooms', 'Parking', 'Lighting', 'Air conditioning'],
          image: 'https://via.placeholder.com/300x200',
          club,
        },
      ];

      await this.groundRepository.save(grounds);
    }

    console.log('Demo data seeded successfully!');
  }
}