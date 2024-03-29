import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from '@Authentication/authentication.module';
import { BookingsModule } from 'src/Bookings/bookings.module';
import { CustomersModule } from '@Customers/customers.module';
import { DatabaseModule } from '@SharedKernel/Infrastructure/database/database.module';
import { MotorcyclistsModule } from '@Motorcyclists/motorcyclists.module';
import { TimeSlotsModule } from '@TimeSlots/time-slots.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    AuthenticationModule,
    BookingsModule,
    CustomersModule,
    DatabaseModule,
    MotorcyclistsModule,
    TimeSlotsModule,
    RouterModule.register([
      { path: 'auth', module: AuthenticationModule },
      { path: 'bookings', module: BookingsModule },
      { path: 'customers', module: CustomersModule },
      { path: 'motorcyclists', module: MotorcyclistsModule },
      { path: 'time-slots', module: TimeSlotsModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
