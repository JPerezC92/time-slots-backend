import { Motorcyclist } from './Motorcyclists';

export class MotorcyclistAvailableService {
  public SearchAvailableWithLessWorkload(
    motorcyclistCollection: Motorcyclist[],
  ): Motorcyclist {
    const motorcyclist = motorcyclistCollection.sort((a, b) => {
      if (a.bookingIdList.length > b.bookingIdList.length) {
        return 1;
      }
      if (a.bookingIdList.length < b.bookingIdList.length) {
        return -1;
      }
      return 0;
    });

    return motorcyclist[0];
  }
}
