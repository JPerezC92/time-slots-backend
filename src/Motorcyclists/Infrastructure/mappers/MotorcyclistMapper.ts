import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistId } from '@Motorcyclists/Domain/MotorcyclistId';
import { MotorcyclistModel } from '@Motorcyclists/Infrastructure/Motorcyclist.model';

export const MotorcyclistMapper = {
  toPersistence: (motorcyclist: Motorcyclist): MotorcyclistModel => {
    const motorcyclistsModel = new MotorcyclistModel();
    motorcyclistsModel.id = motorcyclist.id;
    return motorcyclistsModel;
  },

  toDomain: ({ id, bookingIdList }: MotorcyclistModel): Motorcyclist => {
    return new Motorcyclist({
      motorcyclistId: new MotorcyclistId(id),
      bookingList: bookingIdList.map((m) => new MotorcyclistId(m)),
    });
  },

  toResponse: (motorcyclist: Motorcyclist) => {
    return {
      id: motorcyclist.id,
      isAvailable: motorcyclist.isAvailable,
    };
  },
};
