import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@Authentication/authentication.module';
import { BookingsPostController } from '@Bookings/Infrastructure/controllers/BookingsPost.controller';
import { CustomersModule } from '@Customers/customers.module';
import { DatabaseModule } from '@SharedKernel/Infrastructure/database/database.module';
import { TimeSlotsModule } from '@TimeSlots/time-slots.module';
import { TokenDecoder } from '@Authentication/Infrastructure/Guards/tokenDecoder.guard';

@Module({
  controllers: [BookingsPostController],
  imports: [
    AuthenticationModule,
    CustomersModule,
    DatabaseModule,
    TimeSlotsModule,
  ],
  providers: [TokenDecoder],
})
export class BookingsModule {}
