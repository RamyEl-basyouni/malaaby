import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';
import { Ground } from './ground.entity';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Ground)
    private groundRepository: Repository<Ground>,
  ) {}

  async findAll(filters?: any): Promise<Club[]> {
    const query = this.clubRepository.createQueryBuilder('club')
      .leftJoinAndSelect('club.grounds', 'grounds')
      .leftJoinAndSelect('club.reviews', 'reviews');

    if (filters?.city) {
      query.andWhere('club.city LIKE :city', { city: `%${filters.city}%` });
    }

    if (filters?.sport) {
      query.andWhere('grounds.type = :sport', { sport: filters.sport });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Club> {
    return this.clubRepository.findOne({
      where: { id },
      relations: ['grounds', 'reviews', 'reviews.user'],
    });
  }

  async create(clubData: Partial<Club>): Promise<Club> {
    const club = this.clubRepository.create(clubData);
    return this.clubRepository.save(club);
  }
}