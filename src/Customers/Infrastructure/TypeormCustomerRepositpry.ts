import { Injectable } from '@nestjs/common';

import { Booking } from '@Bookings/Domain/Booking';
import { Customer } from '@Customers/Domain/Customer';
import { CustomerMapper } from '@Customers/Infrastructure/CustomerMapper';
import { CustomerModel } from '@Customers/Infrastructure/Customer.model';
import { CustomerRepository } from '@Customers/Domain/CustomerRepository';
import { Email } from '@Customers/Domain/Email';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';
import { BookingModel } from '@Bookings/Bookings.model';
import { MotorcyclistModel } from '@Motorcyclists/Infrastructure/Motorcyclist.model';

@Injectable()
export class TypeormCustomerRepository implements CustomerRepository {
  constructor(private readonly _uow: Uow) {}

  findById(id: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: Email): Promise<Customer | undefined> {
    const customer = await this._uow.manager.findOne(CustomerModel, {
      email: email.value,
    });

    if (!customer) {
      return undefined;
    }

    return CustomerMapper.toDomain(customer);
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
  // async saveBooking(booking: Booking): Promise<void> {
  //   await this._uow.manager.query(
  //     `
  //     INSERT INTO Booking (id, timeSlotId, customerId, motorcyclistId)
  //     VALUES (
  //       $1, $2, $3,(
  //         SELECT m.id
  //         FROM  Motorcyclist m
  //         WHERE (SELECT COUNT(ts.id) From TimeSlot ts WHERE ts.motorcyclistId = m.id) < 3
  //         LIMIT 1
  //       )
  //     )
  //     `,
  //     [booking.id, booking.timeSlotId, booking.customerId],
  //   );
  // }
}
