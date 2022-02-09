import { Injectable } from '@nestjs/common';

import { Booking } from '@Bookings/Domain/Booking';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';
import { BookingMapper } from './mappers/BookingMapper';
import { BookingModel } from '@Bookings/Bookings.model';

@Injectable()
export class TypeormBookingRepository implements BookingRepository {
  constructor(private readonly _uow: Uow) {}

  async findById(id: Booking['id']): Promise<Booking | undefined> {
    const bookingModel = await this._uow.manager.findOne(BookingModel, id);

    if (bookingModel) return BookingMapper.toDomain(bookingModel);
  }

  async saveBooking(booking: Booking): Promise<void> {
    await this._uow.manager.query(
      `
      INSERT INTO Booking (id, timeSlotId, customerId, motorcyclistId)
      VALUES (
        $1, $2, $3, (
          SELECT m.id
          FROM Motorcyclist m  
          WHERE (SELECT COUNT(b.id) From Booking b WHERE b.motorcyclistId = m.id) < 3 
          LIMIT 1
          )
          )
          `,
      [booking.id, booking.timeSlotId, booking.customerId],
    );
  }

  async deleteBooking(booking: Booking): Promise<void> {
    await this._uow.manager.remove(BookingMapper.toPersistence(booking));
  }
}
