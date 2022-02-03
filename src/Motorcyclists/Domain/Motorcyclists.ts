import { TimeSlot } from '@TimeSlots/Domain/TimeSlot';
import { MotorcyclistId } from './MotorcyclistId';

export class Motorcyclist {
  private readonly _maxWorkLoad = 3;
  private readonly _motorcyclistId: MotorcyclistId;
  public readonly timeSlots: TimeSlot[];

  public get id(): string {
    return this._motorcyclistId.value;
  }
  public get isAvailable(): boolean {
    return this.timeSlots.length < this._maxWorkLoad;
  }

  constructor(props: {
    motorcyclistId: MotorcyclistId;
    timeSlotAssigned: TimeSlot[];
  }) {
    this._motorcyclistId = props.motorcyclistId;
    this.timeSlots = props.timeSlotAssigned;
  }

  // public assignTimeSlot(timeSlot: TimeSlot) {
  //   this.timeSlotAssigned = [
  //     ...this.timeSlotAssigned,
  //     new TimeSlotId(timeSlot.id),
  //   ];
  // }

  // public unassignTimeSlot(timeSlot: TimeSlot) {
  //   this.timeSlotAssigned = this.timeSlotAssigned.filter(
  //     (timeSlotId) => timeSlotId.value !== timeSlot.id
  //   );
  // }
}
