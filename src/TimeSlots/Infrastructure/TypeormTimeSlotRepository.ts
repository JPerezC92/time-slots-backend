import { Injectable } from '@nestjs/common';

import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { TimeSlotMapper } from '@TimeSlots/Infrastructure/mappers/TimeSlotMapper';
import { TimeSlotModel } from '@TimeSlots/Infrastructure/TimeSlot.model';
import { TimeSlotRepository } from '@TimeSlots/Domain/TimeSlotRepository';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';

@Injectable()
export class TypeormTimeSlotRepository implements TimeSlotRepository {
  constructor(private readonly _uow: Uow) {}

  async findAll(): Promise<TimeSlot[]> {
    const timeSlotModelCollection = await this._uow.manager.find(
      TimeSlotModel,
      { order: { start: 'ASC' } },
    );

    return timeSlotModelCollection.map((v) => TimeSlotMapper.toDomain(v));
  }

  async findAllWithCustomerId({
    customerId,
  }: {
    customerId: string;
  }): Promise<TimeSlot[]> {
    const timeSlotModelCollection = await this._uow.manager.find(
      TimeSlotModel,
      { order: { start: 'ASC' } },
    );

    return timeSlotModelCollection.map((v) =>
      TimeSlotMapper.toDomain(v, customerId),
    );
  }

  async save(timeSlot: TimeSlot): Promise<void> {
    const timeSlotModel = TimeSlotMapper.toPersistence(timeSlot);
    await this._uow.manager.save(timeSlotModel);
  }

  async findById(timeSlotId: string): Promise<TimeSlot | undefined> {
    const timeSlotModel = await this._uow.manager.findOne(
      TimeSlotModel,
      timeSlotId,
    );

    return timeSlotModel && TimeSlotMapper.toDomain(timeSlotModel);
  }
}
