import { AuthenticationModule } from '@Authentication/authentication.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/SharedKernel/Infrastructure/database/database.module';

import { TimeSlotsGetController } from './Infrastructure/Controllers/TimeSlotsGet.controller';
import { TimeSlotsPostController } from './Infrastructure/Controllers/TimeSlotsPost.controller';
import { TypeormTimeSlotRepository } from './Infrastructure/TypeormTimeSlotRepository';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [TimeSlotsGetController, TimeSlotsPostController],
  providers: [TypeormTimeSlotRepository],
  exports: [TypeormTimeSlotRepository],
})
export class TimeSlotsModule {}
