import { Body, Controller, Delete, Req, UseGuards } from '@nestjs/common';
import * as Joi from 'joi';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import { ApiController } from '@SharedKernel/Infrastructure/ApiController';
import { ApiExceptionListener } from '@SharedKernel/Infrastructure/exception-handler/ApiExceptionListener';
import {
  ApiExceptionsMapping,
  ExceptionsMap,
} from '@SharedKernel/Infrastructure/exception-handler/ApiExceptionMapping';
import { BookingNotFound } from 'src/Bookings/Domain/BookingNotFound';
import { DeleteBooking } from 'src/Bookings/Application/DeleteBooking';
import { HttpNotFound } from '@SharedKernel/Infrastructure/HttpNotFound';
import { InvalidRequest } from '@SharedKernel/Infrastructure/InvalidRequest';
import {
  JSendSuccess,
  StatusType,
} from '@SharedKernel/Infrastructure/Response';
import { CustomerNotFound } from '@Customers/Domain/CustomerNotFound';
import { JwtAuthGuard } from '@Authentication/Infrastructure/Guards/jwt-auth.guard';
import { TypeormBookingRepository } from 'src/Bookings/Infrastructure/TypeormBookingRepository';
import { TypeormCustomerRepository } from '@Customers/Infrastructure/TypeormCustomerRepositpry';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';

interface BookingDelete {
  readonly bookingId: string;
}

class BookingPostDto {
  public readonly bookingId: string;

  constructor(props: BookingDelete) {
    this.bookingId = props.bookingId;
  }
}

const bookingDeleteSchema = Joi.object<BookingDelete>({
  bookingId: Joi.string().uuid().required(),
});

@Controller()
export class BookingsDeleteController extends ApiController {
  private readonly _deleteBooking: DeleteBooking;

  constructor(
    readonly apiExceptionListener: ApiExceptionListener,
    readonly apiExceptionsMapping: ApiExceptionsMapping,

    private readonly _customerRepository: TypeormCustomerRepository,
    private readonly _bookingRepository: TypeormBookingRepository,
    private readonly _uow: Uow,
  ) {
    super(apiExceptionsMapping, apiExceptionListener);

    this._deleteBooking = new DeleteBooking({
      customerRepository: this._customerRepository,
      bookingRepository: this._bookingRepository,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async run(
    @Req() req: { user: AccessPayload },
    @Body() _body: BookingDelete,
  ): Promise<JSendSuccess> {
    const { bookingId } = this.validate(_body);

    try {
      await this._uow.transaction(
        async () =>
          await this._deleteBooking.execute({
            customerId: req.user.id,
            bookingId,
          }),
      );

      return { status: StatusType.SUCCESS, data: null };
    } catch (error) {
      throw this.apiExceptionListener.onException(error);
    }
  }

  public validate(bookingPost: BookingDelete): BookingPostDto {
    const { error } = bookingDeleteSchema.validate(bookingPost);

    if (error) throw new InvalidRequest(error.message);

    return new BookingPostDto(bookingPost);
  }

  protected exceptions(): ExceptionsMap {
    return {
      [BookingNotFound.name]: HttpNotFound,
      [CustomerNotFound.name]: HttpNotFound,
    };
  }
}
