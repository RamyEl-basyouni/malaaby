import { SportType, GroundType } from '../entities/ground.entity';

export class ClubFiltersDto {
  sportType?: SportType;
  minPrice?: number;
  maxPrice?: number;
  distance?: number;
  groundType?: GroundType;
  userLat?: number;
  userLng?: number;
}