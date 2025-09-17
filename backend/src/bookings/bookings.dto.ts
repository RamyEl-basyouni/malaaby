export class CreateBookingDto {
  groundId: number;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}