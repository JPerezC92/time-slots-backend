import { Customer } from 'src/Customers/Domain/Customer';

export type AccessPayloadProps = Pick<
  Customer,
  'id' | 'firstName' | 'lastName'
>;

export class AccessPayload {
  public readonly id: string;
  public readonly firstName: string; // public readonly email: string, // public readonly username: string, // public readonly roles: string[],
  public readonly lastName: string;

  constructor(Props: AccessPayloadProps) {
    this.id = Props.id;
    this.firstName = Props.firstName;
    this.lastName = Props.lastName;
  }

  toJSON(): AccessPayloadProps {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
