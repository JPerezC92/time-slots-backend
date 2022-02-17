import { DomainException } from 'src/SharedKernel/Domain/DomainException';
import { TimeSlot } from './TimeSlot';

export class TimeSlotAlreadyBooked extends DomainException {
  public readonly name = 'TimeSlotAlreadyBooked';
  public readonly message = `TimeSlot ${this._timeSlot.id} is already booked`;

  constructor(private readonly _timeSlot: TimeSlot) {
    super();
  }
}
