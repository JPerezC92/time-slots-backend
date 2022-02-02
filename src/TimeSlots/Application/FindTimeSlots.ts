import { UseCase } from 'src/SharedKernel/Domain/UseCase';
import { TimeSlot } from '../Domain/TimeSlot';
import { TimeSlotRepository } from '../Domain/TimeSlotRepository';

export class FindTimeSlots implements UseCase<Promise<TimeSlot[]>> {
  private readonly _timeSlotRepository: TimeSlotRepository;

  constructor(props: { timeSlotRepository: TimeSlotRepository }) {
    this._timeSlotRepository = props.timeSlotRepository;
  }

  execute(): Promise<TimeSlot[]> {
    return this._timeSlotRepository.findAll();
  }
}
