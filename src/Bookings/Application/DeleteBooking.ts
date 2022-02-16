import { Booking } from '@Bookings/Domain/Booking';
import { BookingNotFound } from '@Bookings/Domain/BookingNotFound';
import { BookingRepository } from '@Bookings/Domain/BookingRepository';
import { CustomerNotFound } from '@Customers/Domain/CustomerNotFound';
import { CustomerRepository } from '@Customers/Domain/CustomerRepository';
import { UseCase } from '@SharedKernel/Domain/UseCase';

interface Input {
  bookingId: Booking['id'];
  customerId: Booking['customerId'];
}

export class DeleteBooking implements UseCase<Promise<void>, Input> {
  private readonly _bookingRepository: BookingRepository;
  private readonly _customerRepository: CustomerRepository;

  constructor(props: {
    bookingRepository: BookingRepository;
    customerRepository: CustomerRepository;
  }) {
    this._bookingRepository = props.bookingRepository;
    this._customerRepository = props.customerRepository;
  }

  async execute({ bookingId, customerId }: Input): Promise<void> {
    const [booking, customer] = await Promise.all([
      this._bookingRepository.findById(bookingId),
      this._customerRepository.findById(customerId),
    ]);

    if (!booking) throw new BookingNotFound(bookingId);

    if (!customer) throw new CustomerNotFound(customerId);

    if (customer.isOwner(booking)) {
      await this._bookingRepository.deleteBooking(booking);
    }
  }
}
