import { Booking } from '@Bookings/Domain/Booking';
import { BookingId } from '@Bookings/Domain/BookingId';
import { CustomerId } from '@Customers/Domain/CustomerId';
import { CustomerRepository } from '@Customers/Domain/CustomerRepository';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { UseCase } from '@SharedKernel/Domain/UseCase';

interface Input {
  bookingId: BookingId;
  timeSlotId: TimeSlotId;
  customerId: CustomerId;
}

export class CreateBooking implements UseCase<Promise<void>, Input> {
  private readonly _customerRepository: CustomerRepository;
  private readonly _timeSlotRepository: TimeSlotRepository;

  constructor(props: {
    customerRepository: CustomerRepository;
    timeSlotRepository: TimeSlotRepository;
  }) {
    this._customerRepository = props.customerRepository;
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

    await this._customerRepository.saveBooking(booking);
  }
}
