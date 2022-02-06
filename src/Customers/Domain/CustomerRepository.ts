import { Booking } from '@Bookings/Domain/Booking';
import { Customer } from './Customer';
import { Email } from './Email';

export interface CustomerRepository {
  findById(id: string): Promise<Customer>;
  findByEmail(email: Email): Promise<Customer | undefined>;
  saveBooking(booking: Booking): Promise<void>;
}
