import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() bookingData: Partial<Booking>, @Req() req): Promise<Booking> {
    bookingData.user = req.user;
    return this.bookingsService.create(bookingData);
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: string): Promise<Booking[]> {
    return this.bookingsService.findByUser(+userId);
  }
}