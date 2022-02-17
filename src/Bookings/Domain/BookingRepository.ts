import { Booking } from 'src/Bookings/Domain/Booking';
import { Customer } from '@Customers/Domain/Customer';

export interface BookingRepository {
  deleteBooking(booking: Booking): Promise<void>;
  findAllByCustomerId(id: Customer['id']): Promise<Booking[]>;
  findById(id: Booking['id']): Promise<Booking | undefined>;
  saveBooking(booking: Booking): Promise<void>;
}
