import { Customer } from '@Customers/Domain/Customer';
import { CustomerRepository } from '@Customers/Domain/CustomerRepository';
import { Email } from '@Customers/Domain/Email';
import { UseCase } from '@SharedKernel/Domain/UseCase';

export class CustomerFinderByEmail
  implements UseCase<Promise<Customer>, Email>
{
  private _customerRepository: CustomerRepository;

  constructor(props: { customerRepository: CustomerRepository }) {
    this._customerRepository = props.customerRepository;
  }

  async execute(email: Email): Promise<Customer> {
    const customer = await this._customerRepository.findByEmail(email);
    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }
}
