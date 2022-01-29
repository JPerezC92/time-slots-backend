import { CustomerFinderByEmail } from 'src/Customers/Application/CustomerFinderByEmail';
import { CustomerRepository } from 'src/Customers/Domain/CustomerRepository';
import { Email } from 'src/Customers/Domain/Email';
import { Password } from 'src/Customers/Domain/Password';
import { TokenGenerator } from 'src/SharedKernel/Domain/TokenGenerator';
import { UseCase } from 'src/SharedKernel/Domain/UseCase';
import { GenerateToken } from './GenerateToken';

interface Input {
  email: Email;
  password: Password;
}

export class AuthLogger implements UseCase<Promise<string>, Input> {
  private _customerFinderByEmail: CustomerFinderByEmail;
  private _generateToken: GenerateToken;

  constructor(props: {
    tokenGenerator: TokenGenerator;
    customerRepository: CustomerRepository;
  }) {
    this._customerFinderByEmail = new CustomerFinderByEmail({
      customerRepository: props.customerRepository,
    });

    this._generateToken = new GenerateToken({
      tokenGenerator: props.tokenGenerator,
    });
  }

  public async execute(input: Input): Promise<string> {
    const customer = await this._customerFinderByEmail.execute(input.email);

    const token = this._generateToken.execute(customer);

    return token;
  }
}
