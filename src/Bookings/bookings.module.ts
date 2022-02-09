import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@Authentication/authentication.module';
import { BookingsDeleteController } from '@Bookings/Infrastructure/controllers/BookingsDelete.controller';
import { BookingsPostController } from '@Bookings/Infrastructure/controllers/BookingsPost.controller';
import { CustomersModule } from '@Customers/customers.module';
import { DatabaseModule } from '@SharedKernel/Infrastructure/database/database.module';
import { TimeSlotsModule } from '@TimeSlots/time-slots.module';
import { TokenDecoder } from '@Authentication/Infrastructure/Guards/tokenDecoder.guard';
import { TypeormBookingRepository } from '@Bookings/Infrastructure/TypeormBookingRepository';

@Module({
  controllers: [BookingsDeleteController, BookingsPostController],
  imports: [
    AuthenticationModule,
    CustomersModule,
    DatabaseModule,
    TimeSlotsModule,
  ],
  providers: [TokenDecoder, TypeormBookingRepository],
})
export class BookingsModule {}
