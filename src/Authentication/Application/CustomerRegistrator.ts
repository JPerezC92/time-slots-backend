import { AuthRepository } from '../Domain/AuthRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { Email } from 'src/Customers/Domain/Email';
import { FirstName } from 'src/Customers/Domain/FirstName';
import { LastName } from 'src/Customers/Domain/LastName';
import { UseCase } from 'src/SharedKernel/Domain/UseCase';
import { PasswordEncryptor } from '../Domain/PasswordEncryptor';
import { GenerateToken } from './GenerateToken';
import { TokenGenerator } from 'src/SharedKernel/Domain/TokenGenerator';
import { EmailAlreadyRegistered } from '../Domain/Email';

interface CustomerRegistratorInput {
  customerId: CustomerId;
  firstName: FirstName;
  lastName: LastName;
  password: string;
  email: Email;
}

export class CustomerRegistrator
  implements UseCase<Promise<string>, CustomerRegistratorInput>
{
  private readonly _passwordEncryptor: PasswordEncryptor;
  private readonly _authRepository: AuthRepository;

  private readonly _generateToken: GenerateToken;

  constructor(props: {
    passwordEncryptor: PasswordEncryptor;
    tokenGenerator: TokenGenerator;
    authRepository: AuthRepository;
  }) {
    this._passwordEncryptor = props.passwordEncryptor;
    this._authRepository = props.authRepository;

    this._generateToken = new GenerateToken({
      tokenGenerator: props.tokenGenerator,
    });
  }

  async execute(input: CustomerRegistratorInput): Promise<string> {
    const isAlreadyRegistered = await this._authRepository.searchEmailExists(
      input.email,
    );

    if (isAlreadyRegistered) throw new EmailAlreadyRegistered(input.email);

    const password = await this._passwordEncryptor.encrypt(input.password);
    const customer = Customer.create({ ...input, password });

    await this._authRepository.register({ customer });

    return this._generateToken.execute(customer);
  }
}
