import { Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { TimeSlotModel } from '@TimeSlots/TimeSlot.model';

@Entity('Motorcyclist')
export class MotorcyclistModel {
  @PrimaryColumn('uuid')
  id: string;

  @OneToMany(
    (type) => TimeSlotModel,
    (timeSlotModel) => timeSlotModel.motorcyclist,
    { eager: true },
  )
  @JoinColumn()
  timeSlots: TimeSlotModel[];
}
