import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from '../entities/club.entity';
import { Ground } from '../entities/ground.entity';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Ground])],
  providers: [ClubsService],
  controllers: [ClubsController],
  exports: [ClubsService],
})
export class ClubsModule {}