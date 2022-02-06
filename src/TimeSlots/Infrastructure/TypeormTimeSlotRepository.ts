import { Injectable } from '@nestjs/common';

import { TimeSlot } from '../Domain/TimeSlot';
import { TimeSlotMapper } from './mappers/TimeSlotMapper';
import { TimeSlotModel } from './TimeSlot.model';
import { TimeSlotRepository } from '../Domain/TimeSlotRepository';
import { Uow } from 'src/SharedKernel/Infrastructure/database/Uow.service';

@Injectable()
export class TypeormTimeSlotRepository implements TimeSlotRepository {
  constructor(private readonly _uow: Uow) {}

  async findAll(): Promise<TimeSlot[]> {
    const timeSlotModelCollection = (await this._uow.manager
      .createQueryBuilder()
      .select('TimeSlot.*')
      .addSelect(
        (qb) =>
          qb
            .subQuery()
            .select('b.id IS NOT NULL')
            .from('Booking', 'b')
            .where('b.timeSlotId = TimeSlot.id'),
        'isBooked',
      )
      .from(TimeSlotModel, '')
      .orderBy('TimeSlot.start', 'ASC')
      .printSql()
      .getRawMany()) as TimeSlotModel[];

    return timeSlotModelCollection.map(TimeSlotMapper.toDomain);
  }

  async findAllByCustomerId({
    customerId,
  }: {
    customerId: string;
  }): Promise<TimeSlot[]> {
    const timeSlotModelCollection = (await this._uow.manager
      .createQueryBuilder()
      .select('TimeSlot.*')
      .addSelect(
        (qb) =>
          qb
            .subQuery()
            .select('b.id IS NOT NULL')
            .from('Booking', 'b')
            .where('b.timeSlotId = TimeSlot.id'),
        'isBooked',
      )
      .addSelect(
        (qb) =>
          qb
            .subQuery()
            .select('b.id IS NOT NULL')
            .from('Booking', 'b')
            .where('b.timeSlotId = TimeSlot.id AND b.customerId = :customerId'),
        'isBookedByCustomer',
      )
      .from(TimeSlotModel, '')
      .orderBy('TimeSlot.start', 'ASC')
      .setParameter('customerId', customerId)
      .getRawMany()) as TimeSlotModel[];

    return timeSlotModelCollection.map(TimeSlotMapper.toDomain);
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
