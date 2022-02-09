import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import * as Joi from 'joi';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import {
  JSendSuccess,
  StatusType,
} from '@SharedKernel/Infrastructure/Response';
import { BookingId } from '@Bookings/Domain/BookingId';
import { CreateBooking } from '@Bookings/Application/CreateBooking';
import { CustomerId } from '@Customers/Domain/CustomerId';
import { JsUuidGenerator } from '@SharedKernel/Infrastructure/JsUuidGenerator';
import { JwtAuthGuard } from '@Authentication/Infrastructure/Guards/jwt-auth.guard';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { TypeormBookingRepository } from '../TypeormBookingRepository';
import { TypeormTimeSlotRepository } from '@TimeSlots/Infrastructure/TypeormTimeSlotRepository';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';

interface BookingPost {
  readonly timeSlotId: string;
}

class BookingPostDto {
  public readonly timeSlotId: string;

  constructor(props: BookingPost) {
    this.timeSlotId = props.timeSlotId;
  }
}

const bookingPostBodySchema = Joi.object({
  timeSlotId: Joi.string().uuid().required(),
});

@Controller()
export class BookingsPostController {
  private readonly _bookingsCreator: CreateBooking;

  constructor(
    private readonly _bookingRepository: TypeormBookingRepository,
    private readonly _jsUuidGenerator: JsUuidGenerator,
    private readonly _timeSlotRepository: TypeormTimeSlotRepository,
    private readonly _uow: Uow,
  ) {
    this._bookingsCreator = new CreateBooking({
      bookingRepository: this._bookingRepository,
      timeSlotRepository: this._timeSlotRepository,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async run(
    @Body() _body: BookingPost,
    @Req() req: { user: AccessPayload },
  ): Promise<JSendSuccess> {
    const { timeSlotId } = this.validate(_body);

    this._uow.transaction(async () => {
      await this._bookingsCreator.execute({
        bookingId: new BookingId(this._jsUuidGenerator.generate()),
        timeSlotId: new TimeSlotId(timeSlotId),
        customerId: new CustomerId(req.user.id),
      });
    });

    return { status: StatusType.SUCCESS, data: null };
  }

  public validate(bookingPost: BookingPost): BookingPostDto {
    const { error } = bookingPostBodySchema.validate(bookingPost);
    if (error) {
      throw new BadRequestException({
        status: StatusType.FAIL,
        data: error.message,
      });
    }

    return new BookingPostDto(bookingPost);
  }
}
