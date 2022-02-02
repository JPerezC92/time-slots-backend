import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/SharedKernel/Infrastructure/database/database.module';

import { TimeSlotsGetController } from './Infrastructure/Controllers/TimeSlotsGet.controller';
import { TimeSlotsPostController } from './Infrastructure/Controllers/TimeSlotsPost.controller';
import { TypeormTimeSlotRepository } from './TypeormTimeSlotRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [TimeSlotsGetController, TimeSlotsPostController],
  providers: [TypeormTimeSlotRepository],
})
export class TimeSlotsModule {}
