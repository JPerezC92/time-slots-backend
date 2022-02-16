import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import * as Joi from 'joi';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import { ApiController } from '@SharedKernel/Infrastructure/ApiController';
import { ApiExceptionListener } from '@SharedKernel/Infrastructure/exception-handler/ApiExceptionListener';
import {
  ApiExceptionsMapping,
  ExceptionsMap,
} from '@SharedKernel/Infrastructure/exception-handler/ApiExceptionMapping';
import { BookingId } from '@Bookings/Domain/BookingId';
import { CreateBooking } from '@Bookings/Application/CreateBooking';
import { CustomerId } from '@Customers/Domain/CustomerId';
import { HttpForbidden } from '@SharedKernel/Infrastructure/HttpForbidden';
import { InvalidRequest } from '@SharedKernel/Infrastructure/InvalidRequest';
import {
  JSendSuccess,
  StatusType,
} from '@SharedKernel/Infrastructure/Response';
import { JsUuidGenerator } from '@SharedKernel/Infrastructure/JsUuidGenerator';
import { JwtAuthGuard } from '@Authentication/Infrastructure/Guards/jwt-auth.guard';
import { TimeSlotAlreadyBooked } from '@TimeSlots/Domain/TimeSlotAlreadyBooked';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { TypeormBookingRepository } from '@Bookings/Infrastructure/TypeormBookingRepository';
import { TypeormTimeSlotRepository } from '@TimeSlots/Infrastructure/TypeormTimeSlotRepository';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';
import { TimeSlotNotFound } from '@TimeSlots/Domain/TimeSlotNotFound';
import { HttpNotFound } from '@SharedKernel/Infrastructure/HttpNotFound';

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
export class BookingsPostController extends ApiController {
  private readonly _bookingsCreator: CreateBooking;

  constructor(
    readonly apiExceptionListener: ApiExceptionListener,
    readonly apiExceptionsMapping: ApiExceptionsMapping,

    private readonly _bookingRepository: TypeormBookingRepository,
    private readonly _jsUuidGenerator: JsUuidGenerator,
    private readonly _timeSlotRepository: TypeormTimeSlotRepository,
    private readonly _uow: Uow,
  ) {
    super(apiExceptionsMapping, apiExceptionListener);

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

    try {
      await this._uow.transaction(async () => {
        await this._bookingsCreator.execute({
          bookingId: new BookingId(this._jsUuidGenerator.generate()),
          customerId: new CustomerId(req.user.id),
          timeSlotId: new TimeSlotId(timeSlotId),
        });
      });

      return { status: StatusType.SUCCESS, data: null };
    } catch (error) {
      throw this.apiExceptionListener.onException(error);
    }
  }

  public validate(bookingPost: BookingPost): BookingPostDto {
    const { error } = bookingPostBodySchema.validate(bookingPost);

    if (error) throw new InvalidRequest(error.message);

    return new BookingPostDto(bookingPost);
  }

  protected exceptions(): ExceptionsMap {
    return {
      [TimeSlotAlreadyBooked.name]: HttpForbidden,
      [TimeSlotNotFound.name]: HttpNotFound,
    };
  }
}
