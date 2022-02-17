import { Booking } from 'src/Bookings/Domain/Booking';
import { CustomerId } from './CustomerId';
import { Email } from './Email';
import { FirstName } from './FirstName';
import { LastName } from './LastName';
import { Password } from './Password';

interface CustomerProperties {
  customerId: CustomerId;
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  password: Password;
}

export class Customer {
  private readonly _customerId: CustomerId;
  private readonly _firstName: FirstName;
  private readonly _lastName: LastName;
  private readonly _email: Email;
  private readonly _password: Password;

  public get id(): string {
    return this._customerId.value;
  }

  public get firstName(): string {
    return this._firstName.value;
  }

  public get lastName(): string {
    return this._lastName.value;
  }

  public get email(): string {
    return this._email.value;
  }

  public get password(): string {
    return this._password.value;
  }

  constructor(props: CustomerProperties) {
    this._customerId = props.customerId;
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._email = props.email;
    this._password = props.password;
  }

  public static create(props: CustomerProperties): Customer {
    return new Customer({ ...props });
  }

  public isOwner(booking: Booking): boolean {
    return booking.customerId === this._customerId.value;
  }
}
