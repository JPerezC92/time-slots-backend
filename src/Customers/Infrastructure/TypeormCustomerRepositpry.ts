import { Injectable } from '@nestjs/common';

import { Customer } from '../Domain/Customer';
import { CustomerMapper } from './CustomerMapper';
import { CustomerModel } from './Customer.model';
import { CustomerRepository } from '../Domain/CustomerRepository';
import { Email } from '../Domain/Email';
import { Uow } from 'src/SharedKernel/Infrastructure/database/Uow.service';

@Injectable()
export class TypeormCustomerRepository implements CustomerRepository {
  constructor(private readonly _uow: Uow) {}

  findById(id: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: Email): Promise<Customer | undefined> {
    const customer = await this._uow.manager.findOne(CustomerModel, {
      email: email.value,
    });

    if (!customer) {
      return undefined;
    }

    return CustomerMapper.toDomain(customer);
  }
}
