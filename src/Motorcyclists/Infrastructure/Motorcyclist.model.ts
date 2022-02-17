import { Entity, OneToMany, PrimaryColumn, RelationId } from 'typeorm';

import { BookingModel } from 'src/Bookings/Infrastructure/Bookings.model';

@Entity('Motorcyclist')
export class MotorcyclistModel {
  @PrimaryColumn('uuid')
  id: string;

  @OneToMany(() => BookingModel, (bookingsModel) => bookingsModel.motorcyclist)
  bookingList: BookingModel[];

  @RelationId((mm: MotorcyclistModel) => mm.bookingList)
  bookingIdList: string[];
}
