import { Column, Entity, OneToOne, PrimaryColumn, RelationId } from 'typeorm';

import { BookingModel } from '@Bookings/Infrastructure/Bookings.model';

@Entity('TimeSlot')
export class TimeSlotModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('time')
  start: Date;

  @Column('time')
  end: Date;

  @OneToOne(() => BookingModel, (bookingModel) => bookingModel.timeSlot, {
    eager: true,
  })
  booking: BookingModel;
  // @RelationId((tm: TimeSlotModel) => tm.booking)
  // bookingId: string;

  isBooked = false;

  isBookedByCustomer = false;
}
