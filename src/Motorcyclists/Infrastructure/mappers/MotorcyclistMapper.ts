import { Motorcyclist } from 'src/Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistId } from 'src/Motorcyclists/Domain/MotorcyclistId';
import { TimeSlotId } from 'src/TimeSlots/Domain/TimeSlotId';
import { MotorcyclistsModel } from 'src/Motorcyclists/Motorcyclists.model';
import { TimeSlotModel } from 'src/TimeSlots/TimeSlot.model';

export const MotorcyclistMapper = {
  toPersistence: (motorcyclist: Motorcyclist): MotorcyclistsModel => ({
    id: motorcyclist.id,
    timeSlotAssigned: motorcyclist.timeSlotAssigned.map(
      (timeSlotId) => new TimeSlotModel(),
    ),
  }),

  toDomain: (motorcyclist: MotorcyclistsModel): Motorcyclist => {
    return new Motorcyclist({
      motorcyclistId: new MotorcyclistId(motorcyclist.id),
      timeSlotAssigned: motorcyclist.timeSlotAssigned.map(
        (timeSlotId) => new TimeSlotId(timeSlotId.id),
      ),
    });
  },
};
