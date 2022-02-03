import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './Authentication/authentication.module';
import { BookingsModule } from './bookings/bookings.module';
import { DatabaseModule } from './SharedKernel/Infrastructure/database/database.module';
import { TimeSlotsModule } from './TimeSlots/time-slots.module';
import { MotorcyclistsModule } from './motorcyclists/motorcyclists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    AuthenticationModule,
    BookingsModule,
    DatabaseModule,
    MotorcyclistsModule,
    TimeSlotsModule,
    RouterModule.register([
      { path: 'auth', module: AuthenticationModule },
      { path: 'bookings', module: BookingsModule },
      { path: 'time-slots', module: TimeSlotsModule },
      { path: 'motorcyclists', module: MotorcyclistsModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
