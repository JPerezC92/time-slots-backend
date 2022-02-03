import { Motorcyclist } from './Motorcyclists';
// import { TimeSlot } from 'src/TimeSlot/Domain/TimeSlot';

export interface MotorcyclistRepository {
  save(motorcyclist: Motorcyclist): Promise<void>;
  // findById(motorcyclistId: string): Promise<Motorcyclist>;
  // findOneAvailable(): Promise<Motorcyclist>;
  findAll(): Promise<Motorcyclist[]>;
  // addTimeSlotAssigned({
  //   motorcyclistId,
  //   timeSlotId,
  // }: {
  //   motorcyclistId: Motorcyclist['id'];
  //   timeSlotId: TimeSlot['id'];
  // }): Promise<void>;
  // removeTimeSlotAssigned({
  //   motorcyclistId,
  //   timeSlotId,
  // }: {
  //   motorcyclistId: Motorcyclist['id'];
  //   timeSlotId: TimeSlot['id'];
  // }): Promise<void>;
}
