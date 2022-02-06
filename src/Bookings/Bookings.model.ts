import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

import { CustomerModel } from '@Customers/Infrastructure/Customer.model';
import { MotorcyclistModel } from '@Motorcyclists/Infrastructure/Motorcyclist.model';
import { TimeSlotModel } from '@TimeSlots/Infrastructure/TimeSlot.model';

@Entity('Booking')
export class BookingModel {
  @PrimaryColumn('uuid')
  id: string;

  // @ManyToOne(() => MotorcyclistModel)
  @ManyToOne(() => MotorcyclistModel, (mm) => mm.bookingList)
  @JoinColumn()
  motorcyclist: MotorcyclistModel;
  @RelationId((bm: BookingModel) => bm.motorcyclist)
  motorcyclistId: string;

  @OneToOne(() => TimeSlotModel)
  @JoinColumn()
  timeSlot: TimeSlotModel;
  @RelationId((bm: BookingModel) => bm.timeSlot)
  timeSlotId: string;

  // @ManyToOne(() => CustomerModel)
  @ManyToOne(() => CustomerModel, (cm) => cm.bookingList)
  @JoinColumn()
  customer: CustomerModel;
  @RelationId((bm: BookingModel) => bm.customer)
  customerId: string;
}
