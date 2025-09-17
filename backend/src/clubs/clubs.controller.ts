import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubFiltersDto } from './clubs.dto';
import { SportType, GroundType } from '../entities/ground.entity';

@Controller('clubs')
export class ClubsController {
  constructor(private clubsService: ClubsService) {}

  @Get()
  async findAll(@Query() filters: ClubFiltersDto) {
    // Convert query parameters to proper types
    const processedFilters: ClubFiltersDto = {
      ...filters,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      distance: filters.distance ? Number(filters.distance) : undefined,
      userLat: filters.userLat ? Number(filters.userLat) : undefined,
      userLng: filters.userLng ? Number(filters.userLng) : undefined,
    };

    return this.clubsService.findAll(processedFilters);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clubsService.findOne(Number(id));
  }
}