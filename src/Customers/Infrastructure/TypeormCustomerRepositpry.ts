import { Injectable } from '@nestjs/common';

import { Customer } from '@Customers/Domain/Customer';
import { CustomerMapper } from '@Customers/Infrastructure/CustomerMapper';
import { CustomerModel } from '@Customers/Infrastructure/Customer.model';
import { CustomerRepository } from '@Customers/Domain/CustomerRepository';
import { Email } from '@Customers/Domain/Email';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';

@Injectable()
export class TypeormCustomerRepository implements CustomerRepository {
  constructor(private readonly _uow: Uow) {}

  async findById(id: string): Promise<Customer | undefined> {
    const customerModel = await this._uow.manager.findOne(CustomerModel, id);

    if (customerModel) return CustomerMapper.toDomain(customerModel);
  }

  async findByEmail(email: Email): Promise<Customer | undefined> {
    const customer = await this._uow.manager.findOne(CustomerModel, {
      email: email.value,
    });

    if (customer) return CustomerMapper.toDomain(customer);
  }
}
