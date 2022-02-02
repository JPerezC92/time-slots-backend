import { Injectable } from '@nestjs/common';

import { TimeSlot } from './Domain/TimeSlot';
import { TimeSlotRepository } from './Domain/TimeSlotRepository';
import { Uow } from 'src/SharedKernel/Infrastructure/database/Uow.service';
import { TimeSlotMapper } from './Infrastructure/mappers/TimeSlotMapper';
import { TimeSlotModel } from './TimeSlot.model';

@Injectable()
export class TypeormTimeSlotRepository implements TimeSlotRepository {
  constructor(private readonly _uow: Uow) {}

  async findAll(): Promise<TimeSlot[]> {
    const timeSlotModelCollection = await this._uow.manager.find(
      TimeSlotModel,
      { order: { start: 'ASC' } },
    );
    return timeSlotModelCollection.map(TimeSlotMapper.toDomain);
  }

  async save(timeSlot: TimeSlot): Promise<void> {
    const timeSlotModel = TimeSlotMapper.toPersistence(timeSlot);
    await this._uow.manager.save(timeSlotModel);
  }
}
