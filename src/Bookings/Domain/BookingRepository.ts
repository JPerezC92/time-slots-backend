import { Booking } from '@Bookings/Domain/Booking';

export interface BookingRepository {
  deleteBooking(booking: Booking): Promise<void>;
  findById(id: Booking['id']): Promise<Booking | undefined>;
  saveBooking(booking: Booking): Promise<void>;
}
