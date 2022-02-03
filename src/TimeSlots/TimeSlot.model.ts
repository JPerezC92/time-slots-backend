import { MotorcyclistModel } from '@Motorcyclists/Infrastructure/Motorcyclist.model';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('TimeSlot')
export class TimeSlotModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('time')
  start: Date;

  @Column('time')
  end: Date;

  @Column()
  isBooked: boolean;

  @ManyToOne(
    (type) => MotorcyclistModel,
    (motorcyclistModel) => motorcyclistModel.timeSlots,
  )
  motorcyclist: MotorcyclistModel;
}
