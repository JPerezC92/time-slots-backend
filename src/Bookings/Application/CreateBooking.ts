import { Booking } from 'src/Bookings/Domain/Booking';
import { BookingId } from 'src/Bookings/Domain/BookingId';
import { BookingRepository } from 'src/Bookings/Domain/BookingRepository';
import { CustomerId } from '@Customers/Domain/CustomerId';
import { TimeSlotAlreadyBooked } from '@TimeSlots/Domain/TimeSlotAlreadyBooked';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { TimeSlotNotFound } from '@TimeSlots/Domain/TimeSlotNotFound';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { UseCase } from '@SharedKernel/Domain/UseCase';

interface Input {
  bookingId: BookingId;
  timeSlotId: TimeSlotId;
  customerId: CustomerId;
}

export class CreateBooking implements UseCase<Promise<void>, Input> {
  private readonly _bookingRepository: BookingRepository;
  private readonly _timeSlotRepository: TimeSlotRepository;

  constructor(props: {
    bookingRepository: BookingRepository;
    timeSlotRepository: TimeSlotRepository;
  }) {
    this._bookingRepository = props.bookingRepository;
    this._timeSlotRepository = props.timeSlotRepository;
  }

  async execute({ timeSlotId, customerId, bookingId }: Input): Promise<void> {
    const timeSlot = await this._timeSlotRepository.findById(timeSlotId.value);

    if (!timeSlot) throw new TimeSlotNotFound(timeSlotId.value);

    if (timeSlot.isBooked) throw new TimeSlotAlreadyBooked(timeSlot);

    const booking = Booking.makeBooking({
      bookingId: bookingId,
      customerId: customerId,
      timeSlotId: timeSlotId,
    });

    await this._bookingRepository.saveBooking(booking);
  }
}
