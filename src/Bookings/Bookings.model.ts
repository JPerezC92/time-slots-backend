import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { MotorcyclistsModel } from 'src/Motorcyclists/Motorcyclists.model';
import { TimeSlotModel } from 'src/TimeSlot/TimeSlot.model';
import { CustomerModel } from 'src/Customers/Infrastructure/Customer.model';

@Entity('Booking')
export class BookingsModel {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne((type) => MotorcyclistsModel)
  @JoinColumn()
  motorcyclist: MotorcyclistsModel[];

  @OneToOne((type) => TimeSlotModel)
  @JoinColumn()
  timeSlot: TimeSlotModel;

  @OneToOne((type) => CustomerModel)
  @JoinColumn()
  ccustomer: CustomerModel;
}
