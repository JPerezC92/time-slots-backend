import { Customer } from '../Domain/Customer';
import { CustomerModel } from './Customer.model';
import { Password } from '../Domain/Password';
import { CustomerId } from '../Domain/CustomerId';
import { Email } from '../Domain/Email';
import { FirstName } from '../Domain/FirstName';

export const CustomerMapper = {
  toPersistence(customer: Customer): CustomerModel {
    const customerModel = new CustomerModel();
    customerModel.email = customer.email;
    customerModel.firstName = customer.firstName;
    customerModel.id = customer.id;
    customerModel.lastName = customer.lastName;
    customerModel.password = customer.password;
    return customerModel;
  },

  toDomain(customerModel: CustomerModel): Customer {
    return new Customer({
      customerId: new CustomerId(customerModel.id),
      email: new Email(customerModel.email),
      firstName: new FirstName(customerModel.firstName),
      lastName: new FirstName(customerModel.lastName),
      password: new Password(customerModel.password),
    });
  },
};
