import { Customer } from 'src/Customers/Domain/Customer';
import { TokenGenerator } from 'src/SharedKernel/Domain/TokenGenerator';
import { UseCase } from 'src/SharedKernel/Domain/UseCase';
import { AccessPayload } from '../Domain/AccessPayload';

export class GenerateToken implements UseCase<string, Customer> {
  private readonly _tokenGenerator: TokenGenerator;
  constructor(props: { tokenGenerator: TokenGenerator }) {
    this._tokenGenerator = props.tokenGenerator;
  }
  execute(customer: Customer): string {
    const accessPayload = new AccessPayload(customer);

    const token = this._tokenGenerator.sign(accessPayload.toJSON());
    return token;
  }
}
