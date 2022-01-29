import { Email } from 'src/Customers/Domain/Email';
import { DomainException } from 'src/SharedKernel/Domain/DomainException';

export class EmailAlreadyRegistered extends DomainException {
  public readonly name: string = 'EmailAlreadyRegistered';
  public readonly message: string = `El correo ${this.email.value} ya está registrado`;

  constructor(private readonly email: Email) {
    super();
  }
}
