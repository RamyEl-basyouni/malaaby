import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClubsModule } from './clubs/clubs.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { DataSeederService } from './common/data-seeder.service';
import { Club } from './clubs/club.entity';
import { Ground } from './clubs/ground.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'malaaby.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Club, Ground]),
    AuthModule,
    ClubsModule,
    BookingsModule,
    UsersModule,
  ],
  providers: [DataSeederService],
})
export class AppModule {}