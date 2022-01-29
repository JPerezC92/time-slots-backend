import { Customer as Customer } from 'src/Customers/Domain/Customer';
import { Email } from 'src/Customers/Domain/Email';

export interface AuthRepository {
  register(props: { customer: Customer }): Promise<void>;
  searchEmailExists(email: Email): Promise<boolean>;
  searchCustomer(email: Email): Promise<Customer | undefined>;
}

// export interface CustomerRepository {

// }
