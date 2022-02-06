import { TimeSlot } from './TimeSlot';

export interface TimeSlotRepository {
  findAll(): Promise<TimeSlot[]>;
  findAllByCustomerId(config: { customerId: string }): Promise<TimeSlot[]>;
  save(timeSlot: TimeSlot): Promise<void>;
  findById(timeSlotId: TimeSlot['id']): Promise<TimeSlot | undefined>;
  // update(timeSlot: TimeSlot): Promise<void>;
}
