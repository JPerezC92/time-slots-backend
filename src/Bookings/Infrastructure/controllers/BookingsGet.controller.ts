import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import { FindBookings } from '@Bookings/Application/FindBookings';
import {
  JSendSuccess,
  StatusType,
} from '@SharedKernel/Infrastructure/Response';
import { JwtAuthGuard } from '@Authentication/Infrastructure/Guards/jwt-auth.guard';
import { TypeormBookingRepository } from '@Bookings/Infrastructure/TypeormBookingRepository';
import { BookingMapper } from '../mappers/BookingMapper';

@Controller()
export class BookingsGetController {
  private readonly _findBookings: FindBookings;
  constructor(
    private readonly _typeormBookingRepository: TypeormBookingRepository,
  ) {
    this._findBookings = new FindBookings({
      bookingRepository: this._typeormBookingRepository,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async run(@Req() req: { user: AccessPayload }): Promise<JSendSuccess> {
    const bookings = await this._findBookings.execute({
      customerId: req.user.id,
    });

    return {
      status: StatusType.SUCCESS,
      data: {
        bookings: bookings.map(BookingMapper.toPersistence),
      },
    };
  }
}
