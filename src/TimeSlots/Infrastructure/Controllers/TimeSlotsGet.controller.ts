import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import { FindTimeSlots } from '@TimeSlots/Application/FindTimeSlots';
import {
  JSendSuccess,
  StatusType,
} from '@SharedKernel/Infrastructure/Response';
import { TimeSlotMapper } from '@TimeSlots/Infrastructure/mappers/TimeSlotMapper';
import { TokenDecoder } from '@Authentication/Infrastructure/Guards/tokenDecoder.guard';
import { TypeormTimeSlotRepository } from '@TimeSlots/Infrastructure/TypeormTimeSlotRepository';
import { CustomerId } from '@Customers/Domain/CustomerId';

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

  @UseGuards(TokenDecoder)
  @Get()
  async run(@Req() req: { user?: AccessPayload }): Promise<JSendSuccess> {
    const customerId = req.user && new CustomerId(req.user.id);
    const timeSlots = await this._findTimeSlots.execute({ customerId });

    return {
      status: StatusType.SUCCESS,
      data: { timeSlots: timeSlots.map(TimeSlotMapper.toResponse) },
    };
  }
}
