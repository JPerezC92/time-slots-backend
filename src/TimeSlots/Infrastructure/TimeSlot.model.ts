import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

import { BookingModel } from 'src/Bookings/Infrastructure/Bookings.model';

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

  isBooked = false;

  isBookedByCustomer = false;
}
