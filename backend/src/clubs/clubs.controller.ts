import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club } from './club.entity';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async findAll(@Query() filters: any): Promise<Club[]> {
    return this.clubsService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Club> {
    return this.clubsService.findOne(+id);
  }

  @Post()
  async create(@Body() clubData: Partial<Club>): Promise<Club> {
    return this.clubsService.create(clubData);
  }
}