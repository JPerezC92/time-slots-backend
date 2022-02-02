import { TimeSlotModel } from 'src/TimeSlots/TimeSlot.model';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('Motorcyclist')
export class MotorcyclistsModel {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToMany((type) => TimeSlotModel)
  @JoinTable()
  timeSlotAssigned: TimeSlotModel[];
}
