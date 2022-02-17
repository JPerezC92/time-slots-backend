import { BookingId } from 'src/Bookings/Domain/BookingId';
import { MotorcyclistId } from '@Motorcyclists/Domain/MotorcyclistId';

export class Motorcyclist {
  private readonly _maxWorkLoad = 3;
  private readonly _motorcyclistId: MotorcyclistId;
  public readonly bookingIdList: BookingId[];

  public get id(): string {
    return this._motorcyclistId.value;
  }
  public get isAvailable(): boolean {
    return this.bookingIdList.length < this._maxWorkLoad;
  }

  constructor(props: {
    motorcyclistId: MotorcyclistId;
    bookingList: BookingId[];
  }) {
    this._motorcyclistId = props.motorcyclistId;
    this.bookingIdList = props.bookingList;
  }
}
