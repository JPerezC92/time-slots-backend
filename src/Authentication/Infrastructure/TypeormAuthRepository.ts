import { Injectable } from '@nestjs/common';

import { AuthRepository } from '../Domain/AuthRepository';
import { Customer } from 'src/Customers/Domain/Customer';
import { CustomerMapper } from 'src/Customers/Infrastructure/CustomerMapper';
import { CustomerModel } from 'src/Customers/Infrastructure/Customer.model';
import { Email } from 'src/Customers/Domain/Email';
import { Uow } from 'src/SharedKernel/Infrastructure/database/Uow.service';

@Injectable()
export class TypeormAuthRepository implements AuthRepository {
  constructor(private readonly _uow: Uow) {}

  async register(props: { customer: Customer }): Promise<void> {
    const customerModel = CustomerMapper.toPersistence(props.customer);
    await this._uow.manager.save(customerModel);
  }

  async searchEmailExists(email: Email): Promise<boolean> {
    const found = await this._uow.manager.findOne(CustomerModel, {
      email: email.value,
    });

    return Boolean(found);
  }

  async searchCustomer(email: Email): Promise<Customer | undefined> {
    const found = await this._uow.manager.findOne(CustomerModel, {
      email: email.value,
    });

    if (!found) {
      return undefined;
    }

    return CustomerMapper.toDomain(found);
  }
}
