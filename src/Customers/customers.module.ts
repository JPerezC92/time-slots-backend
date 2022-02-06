import { Module } from '@nestjs/common';

import { TypeormCustomerRepository } from '@Customers/Infrastructure/TypeormCustomerRepositpry';
import { DatabaseModule } from '@SharedKernel/Infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TypeormCustomerRepository],
  exports: [TypeormCustomerRepository],
})
export class CustomersModule {}
