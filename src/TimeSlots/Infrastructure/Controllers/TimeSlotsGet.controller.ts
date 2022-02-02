import { Controller, Get } from '@nestjs/common';

import {
  JSendSuccess,
  StatusType,
} from 'src/SharedKernel/Infrastructure/Response';
import { FindTimeSlots } from 'src/TimeSlots/Application/FindTimeSlots';
import { TypeormTimeSlotRepository } from 'src/TimeSlots/TypeormTimeSlotRepository';
import { TimeSlotMapper } from '../mappers/TimeSlotMapper';

@Controller()
export class TimeSlotsGetController {
  private readonly _findTimeSlots: FindTimeSlots;

  constructor(
    private readonly _typeormTimeSlotRepository: TypeormTimeSlotRepository,
  ) {
    this._findTimeSlots = new FindTimeSlots({
      timeSlotRepository: this._typeormTimeSlotRepository,
    });
  }

  @Get()
  async run(): Promise<JSendSuccess> {
    const timeSlots = await this._findTimeSlots.execute();

    return {
      status: StatusType.SUCCESS,
      data: { timeSlots: timeSlots.map(TimeSlotMapper.toPersistence) },
    };
  }
}
