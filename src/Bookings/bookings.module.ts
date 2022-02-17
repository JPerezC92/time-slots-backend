import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@Authentication/authentication.module';
import { BookingsDeleteController } from 'src/Bookings/Infrastructure/controllers/BookingsDelete.controller';
import { BookingsGetController } from 'src/Bookings/Infrastructure/controllers/BookingsGet.controller';
import { BookingsPostController } from 'src/Bookings/Infrastructure/controllers/BookingsPost.controller';
import { CustomersModule } from '@Customers/customers.module';
import { DatabaseModule } from '@SharedKernel/Infrastructure/database/database.module';
import { ExceptionHandlerModule } from '@SharedKernel/Infrastructure/exception-handler/exception-handler.module';
import { TimeSlotsModule } from '@TimeSlots/time-slots.module';
import { TokenDecoder } from '@Authentication/Infrastructure/Guards/tokenDecoder.guard';
import { TypeormBookingRepository } from 'src/Bookings/Infrastructure/TypeormBookingRepository';

@Module({
  controllers: [
    BookingsDeleteController,
    BookingsPostController,
    BookingsGetController,
  ],
  imports: [
    AuthenticationModule,
    CustomersModule,
    DatabaseModule,
    ExceptionHandlerModule,
    TimeSlotsModule,
  ],
  providers: [TokenDecoder, TypeormBookingRepository],
})
export class BookingsModule {}
