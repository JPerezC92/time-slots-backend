import { Booking } from '@Bookings/Domain/Booking';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { Customer } from '@Customers/Domain/Customer';
import { UseCase } from '@SharedKernel/Domain/UseCase';

interface Input {
  customerId: Customer['id'];
}

export class FindBookings implements UseCase<Promise<Booking[]>, Input> {
  private readonly _bookingRepository: BookingRepository;

  constructor(props: { bookingRepository: BookingRepository }) {
    this._bookingRepository = props.bookingRepository;
  }

  async execute({ customerId }: Input): Promise<Booking[]> {
    const bookingList = await this._bookingRepository.findAllByCustomerId(
      customerId,
    );

    return bookingList;
  }
}
