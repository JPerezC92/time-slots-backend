import { UseCase } from 'src/SharedKernel/Domain/UseCase';
import { Customer } from '../Domain/Customer';
import { CustomerRepository } from '../Domain/CustomerRepository';
import { Email } from '../Domain/Email';

interface Presenter<Output> {
  (customer: Customer): Output;
}

export class CustomerFinderByEmail
  implements UseCase<Promise<Customer>, Email>
{
  private _customerRepository: CustomerRepository;
  // private _output: Presenter<Output>;

  constructor(props: {
    customerRepository: CustomerRepository;
    // output: Presenter<Output>;
  }) {
    this._customerRepository = props.customerRepository;
    // this._output = props.output;
  }
  async execute(email: Email): Promise<Customer> {
    const customer = await this._customerRepository.findByEmail(email);
    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }
}
