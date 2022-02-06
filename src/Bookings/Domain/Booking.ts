import { CustomerId } from '@Customers/Domain/CustomerId';
import { MotorcyclistId } from '@Motorcyclists/Domain/MotorcyclistId';
import { TimeSlotId } from '@TimeSlots/Domain/TimeSlotId';
import { BookingId } from './BookingId';

export class Booking {
  private readonly _id: BookingId;
  private readonly _customerId: CustomerId;
  private readonly _timeSlotId: TimeSlotId;
  private readonly _motorcyclistId: MotorcyclistId;

  public get id(): string {
    return this._id.value;
  }

  public get customerId(): string {
    return this._customerId.value;
  }

  public get timeSlotId(): string {
    return this._timeSlotId.value;
  }

  public get motorcyclistId(): string {
    return this._motorcyclistId.value;
  }

  constructor(props: {
    bookingId: BookingId;
    customerId: CustomerId;
    timeSlotId: TimeSlotId;
    motorcyclistId: MotorcyclistId;
  }) {
    this._id = props.bookingId;
    this._customerId = props.customerId;
    this._timeSlotId = props.timeSlotId;
    this._motorcyclistId = props.motorcyclistId;
  }

  public static makeBooking(props: {
    bookingId: BookingId;
    customerId: CustomerId;
    timeSlotId: TimeSlotId;
  }): Booking {
    return new Booking({
      bookingId: props.bookingId,
      customerId: props.customerId,
      timeSlotId: props.timeSlotId,
      motorcyclistId: new MotorcyclistId(''),
    });
  }
}
