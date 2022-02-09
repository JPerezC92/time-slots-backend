import { Customer } from './Customer';
import { Email } from './Email';

export interface CustomerRepository {
  findById(id: Customer['id']): Promise<Customer | undefined>;
  findByEmail(email: Email): Promise<Customer | undefined>;
}
