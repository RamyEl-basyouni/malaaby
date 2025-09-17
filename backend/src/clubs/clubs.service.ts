import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../entities/club.entity';
import { Ground, SportType, GroundType } from '../entities/ground.entity';
import { ClubFiltersDto } from './clubs.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Ground)
    private groundRepository: Repository<Ground>,
  ) {}

  async findAll(filters: ClubFiltersDto = {}) {
    const queryBuilder = this.clubRepository
      .createQueryBuilder('club')
      .leftJoinAndSelect('club.grounds', 'ground')
      .leftJoinAndSelect('club.reviews', 'review');

    // Apply filters
    if (filters.sportType) {
      queryBuilder.andWhere('ground.sportType = :sportType', { 
        sportType: filters.sportType 
      });
    }

    if (filters.groundType) {
      queryBuilder.andWhere('ground.groundType = :groundType', { 
        groundType: filters.groundType 
      });
    }

    if (filters.minPrice !== undefined) {
      queryBuilder.andWhere('ground.pricePerHour >= :minPrice', { 
        minPrice: filters.minPrice 
      });
    }

    if (filters.maxPrice !== undefined) {
      queryBuilder.andWhere('ground.pricePerHour <= :maxPrice', { 
        maxPrice: filters.maxPrice 
      });
    }

    const clubs = await queryBuilder.getMany();

    // Calculate distance if user location provided
    if (filters.userLat && filters.userLng && filters.distance) {
      return clubs.filter(club => {
        const distance = this.calculateDistance(
          filters.userLat!,
          filters.userLng!,
          Number(club.latitude),
          Number(club.longitude)
        );
        return distance <= filters.distance!;
      });
    }

    return clubs;
  }

  async findOne(id: number) {
    return this.clubRepository.findOne({
      where: { id },
      relations: ['grounds', 'reviews', 'reviews.user'],
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}