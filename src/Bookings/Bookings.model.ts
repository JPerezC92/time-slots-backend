import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { MotorcyclistModel } from '@Motorcyclists/Infrastructure/Motorcyclist.model';
import { TimeSlotModel } from 'src/TimeSlots/TimeSlot.model';
import { CustomerModel } from 'src/Customers/Infrastructure/Customer.model';

@Entity('Booking')
export class BookingsModel {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne((type) => MotorcyclistModel)
  @JoinColumn()
  motorcyclist: MotorcyclistModel[];

  @OneToOne((type) => TimeSlotModel)
  @JoinColumn()
  timeSlot: TimeSlotModel;

  @OneToOne((type) => CustomerModel)
  @JoinColumn()
  ccustomer: CustomerModel;
}
