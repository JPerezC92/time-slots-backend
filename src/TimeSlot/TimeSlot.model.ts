import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
