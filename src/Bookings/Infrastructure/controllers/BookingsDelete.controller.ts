import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import * as Joi from 'joi';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import { DeleteBooking } from '@Bookings/Application/DeleteBooking';
import {
  JSendSuccess,
  StatusType,
} from '@SharedKernel/Infrastructure/Response';
import { JwtAuthGuard } from '@Authentication/Infrastructure/Guards/jwt-auth.guard';
import { TypeormBookingRepository } from '@Bookings/Infrastructure/TypeormBookingRepository';
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
export class BookingsDeleteController {
  private readonly _deleteBooking: DeleteBooking;

  constructor(
    private readonly _uow: Uow,
    private readonly _customerRepository: TypeormCustomerRepository,
    private readonly _bookingRepository: TypeormBookingRepository,
  ) {
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

    await this._uow.transaction(
      async () =>
        await this._deleteBooking.execute({
          customerId: req.user.id,
          bookingId,
        }),
    );

    return { status: StatusType.SUCCESS, data: null };
  }

  public validate(bookingPost: BookingDelete): BookingPostDto {
    const { error } = bookingDeleteSchema.validate(bookingPost);
    if (error) {
      throw new BadRequestException({
        status: StatusType.FAIL,
        data: error.message,
      });
    }

    return new BookingPostDto(bookingPost);
  }
}
