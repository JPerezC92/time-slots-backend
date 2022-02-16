import { DomainException } from '@SharedKernel/Domain/DomainException';

export class TimeSlotNotFound extends DomainException {
  readonly name = 'TimeSlotNotFound';
  readonly message = `Time slot with id ${this.timeSlotId} not found`;

  constructor(private readonly timeSlotId: string) {
    super();
  }
}
