import { DomainException } from '@SharedKernel/Domain/DomainException';

export class CustomerNotFound extends DomainException {
  readonly name = 'CustomerNotFound';
  readonly message = `Customer with id ${this.customerId} not found`;

  constructor(private readonly customerId: string) {
    super();
  }
}
