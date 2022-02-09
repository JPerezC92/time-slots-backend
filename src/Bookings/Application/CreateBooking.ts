import { Booking } from '@Bookings/Domain/Booking';
import { BookingId } from '@Bookings/Domain/BookingId';
import { CustomerId } from '@Customers/Domain/CustomerId';
import { CustomerRepository } from '@Customers/Domain/CustomerRepository';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { UseCase } from '@SharedKernel/Domain/UseCase';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';

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

  async execute(input: Input): Promise<void> {
    const timeSlot = await this._timeSlotRepository.findById(
      input.timeSlotId.value,
    );

    if (!timeSlot) throw new Error('TimeSlot not found');

    if (timeSlot.isBooked) throw new Error('TimeSlot is already booked');

    const booking = Booking.makeBooking({
      bookingId: input.bookingId,
      customerId: input.customerId,
      timeSlotId: input.timeSlotId,
    });

    await this._bookingRepository.saveBooking(booking);
  }
}
