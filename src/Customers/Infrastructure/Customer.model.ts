import { Column, Entity, OneToMany, PrimaryColumn, RelationId } from 'typeorm';
import { BookingModel } from '@Bookings/Bookings.model';

@Entity('Customer')
export class CustomerModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BookingModel, (bookingModel) => bookingModel.customer)
  bookingList: BookingModel[];

  @RelationId((mm: CustomerModel) => mm.bookingList)
  bookingIdList: string[];
}
