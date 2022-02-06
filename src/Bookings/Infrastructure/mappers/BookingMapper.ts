import { BookingModel } from '@Bookings/Bookings.model';
import { Booking } from '@Bookings/Domain/Booking';

export const BookingMapper = {
  toPersistence: (booking: Booking): BookingModel => {
    const bookingsModel = new BookingModel();
    bookingsModel.id = booking.id;
    // bookingsModel.motorcyclistId = booking.motorcyclistId;
    // bookingsModel.timeSlotId = booking.timeSlotId;
    // bookingsModel.customerId = booking.customerId;

    return bookingsModel;
  },
};
