import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
