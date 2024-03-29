import { Injectable } from '@nestjs/common';

import { Booking } from 'src/Bookings/Domain/Booking';
import { BookingRepository } from 'src/Bookings/Domain/BookingRepository';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';
import { BookingMapper } from 'src/Bookings/Infrastructure/mappers/BookingMapper';
import { BookingModel } from 'src/Bookings/Infrastructure/Bookings.model';
import { Customer } from '@Customers/Domain/Customer';

@Injectable()
export class TypeormBookingRepository implements BookingRepository {
  constructor(private readonly _uow: Uow) {}

  async findById(bookingId: Booking['id']): Promise<Booking | undefined> {
    const bookingModel = await this._uow.manager.findOne(
      BookingModel,
      bookingId,
    );

    if (bookingModel) return BookingMapper.toDomain(bookingModel);
  }

  async findAllByCustomerId(customerId: Customer['id']): Promise<Booking[]> {
    const bookingModels = await this._uow.manager.find(BookingModel, {
      where: { customer: { id: customerId } },
    });

    return bookingModels.map(BookingMapper.toDomain);
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
