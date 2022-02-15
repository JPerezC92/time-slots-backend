import { CustomerId } from '@Customers/Domain/CustomerId';
import { string } from 'joi';
import { UseCase } from 'src/SharedKernel/Domain/UseCase';
import { TimeSlot } from '../Domain/TimeSlot';
import { TimeSlotRepository } from '../Domain/TimeSlotRepository';

interface Input {
  customerId?: CustomerId;
}

export class FindTimeSlots implements UseCase<Promise<TimeSlot[]>, Input> {
  private readonly _timeSlotRepository: TimeSlotRepository;

  constructor(props: { timeSlotRepository: TimeSlotRepository }) {
    this._timeSlotRepository = props.timeSlotRepository;
  }

  execute({ customerId }: Input): Promise<TimeSlot[]> {
    if (customerId) {
      return this._timeSlotRepository.findAllWithCustomerId({
        customerId: customerId.value,
      });
    }

    return this._timeSlotRepository.findAll();
  }
}
