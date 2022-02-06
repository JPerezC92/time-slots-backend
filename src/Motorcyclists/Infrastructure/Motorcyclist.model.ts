import { Entity, OneToMany, PrimaryColumn, RelationId } from 'typeorm';

import { BookingModel } from '@Bookings/Bookings.model';

@Entity('Motorcyclist')
export class MotorcyclistModel {
  @PrimaryColumn('uuid')
  id: string;

  @OneToMany(() => BookingModel, (bookingsModel) => bookingsModel.motorcyclist)
  bookingList: BookingModel[];

  @RelationId((mm: MotorcyclistModel) => mm.bookingList)
  bookingIdList: string[];
}
