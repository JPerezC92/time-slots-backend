import { BookingModel } from '@Bookings/Infrastructure/Bookings.model';
import { Booking } from '@Bookings/Domain/Booking';
import { BookingId } from '@Bookings/Domain/BookingId';
import { CustomerId } from '@Customers/Domain/CustomerId';
import { MotorcyclistId } from '@Motorcyclists/Domain/MotorcyclistId';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';

export const BookingMapper = {
  toPersistence: (booking: Booking): BookingModel => {
    const bookingsModel = new BookingModel();
    bookingsModel.id = booking.id;
    bookingsModel.motorcyclistId = booking.motorcyclistId;
    bookingsModel.timeSlotId = booking.timeSlotId;
    bookingsModel.customerId = booking.customerId;

    return bookingsModel;
  },

  toDomain: (bookingModel: BookingModel): Booking => {
    return new Booking({
      bookingId: new BookingId(bookingModel.id),
      customerId: new CustomerId(bookingModel.customerId),
      motorcyclistId: new MotorcyclistId(bookingModel.motorcyclistId),
      timeSlotId: new TimeSlotId(bookingModel.timeSlotId),
    });
  },
};
