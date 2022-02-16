import { DomainException } from '@SharedKernel/Domain/DomainException';

export class BookingNotFound extends DomainException {
  readonly name = 'BookingNotFound';
  readonly message = `Booking with id ${this.bookingId} not found`;

  constructor(private readonly bookingId: string) {
    super();
  }
}
