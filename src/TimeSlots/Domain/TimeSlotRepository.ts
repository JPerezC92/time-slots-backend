import { TimeSlot } from './TimeSlot';

export interface TimeSlotRepository {
  findAll(): Promise<TimeSlot[]>;
  save(timeSlot: TimeSlot): Promise<void>;
  // findById(timeSlot: TimeSlot['id']): Promise<TimeSlot>;
  // update(timeSlot: TimeSlot): Promise<void>;
}
