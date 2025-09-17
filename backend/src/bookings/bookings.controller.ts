import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './bookings.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req: any, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(req.user.id, createBookingDto);
  }

  @Get('user/:userId')
  async findUserBookings(@Param('userId') userId: number) {
    return this.bookingsService.findUserBookings(Number(userId));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.bookingsService.findOne(Number(id));
  }
}