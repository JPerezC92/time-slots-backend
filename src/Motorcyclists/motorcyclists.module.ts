import { Module } from '@nestjs/common';

import { DatabaseModule } from '@SharedKernel/Infrastructure/database/database.module';
import { MotorcyclistGetController } from '@Motorcyclists/Infrastructure/controllers/MotorcyclistGet.controller';
import { MotorcyclistPostController } from '@Motorcyclists/Infrastructure/controllers/MotorcyclistPost.controller';
import { TypeormMotorcyclistRepository } from '@Motorcyclists/Infrastructure/TypeormMotorcyclistRepository';

@Module({
  imports: [DatabaseModule],
  providers: [TypeormMotorcyclistRepository],
  controllers: [MotorcyclistPostController, MotorcyclistGetController],
})
export class MotorcyclistsModule {}
