import { DomainException } from 'src/SharedKernel/Domain/DomainException';
import { TimeSlot } from './TimeSlot';

export class TimeSlotAlreadyBooked extends DomainException {
  constructor(private readonly _timeSlot: TimeSlot) {
    super();
  }

  public readonly name = 'TimeSlotAlreadyBooked';

  // public readonly message = `TimeSlot ${this._timeSlot.start.toLocaleTimeString(
  //   global.language,
  //   { hour: '2-digit', minute: '2-digit', hour12: true },
  // )} - ${this._timeSlot.end.toLocaleTimeString(globalThis.language, {
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   hour12: true,
  // })} is already booked`;
  public readonly message = `TimeSlot is already booked`;
}
