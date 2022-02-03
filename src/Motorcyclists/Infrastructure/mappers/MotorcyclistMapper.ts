import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistId } from '@Motorcyclists/Domain/MotorcyclistId';
import { MotorcyclistModel } from '@Motorcyclists/Infrastructure/Motorcyclist.model';
import { TimeSlotMapper } from '@TimeSlots/Infrastructure/mappers/TimeSlotMapper';

export const MotorcyclistMapper = {
  toPersistence: (motorcyclist: Motorcyclist): MotorcyclistModel => {
    const motorcyclistsModel = new MotorcyclistModel();
    motorcyclistsModel.id = motorcyclist.id;
    motorcyclistsModel.timeSlots = motorcyclist.timeSlots.map(
      TimeSlotMapper.toPersistence,
    );

    return motorcyclistsModel;
  },

  toDomain: (motorcyclist: MotorcyclistModel): Motorcyclist => {
    return new Motorcyclist({
      motorcyclistId: new MotorcyclistId(motorcyclist.id),
      timeSlotAssigned: motorcyclist.timeSlots.map(TimeSlotMapper.toDomain),
    });
  },
};
