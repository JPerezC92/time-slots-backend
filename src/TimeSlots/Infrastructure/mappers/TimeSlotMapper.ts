import { IsBookedByCustomer } from 'src/TimeSlots/Domain/IsBookedByCustomer';
import { TimeSlot } from 'src/TimeSlots/Domain/TimeSlot';
import { TimeSlotEnd } from 'src/TimeSlots/Domain/TimeSlotEnd';
import { TimeSlotId } from 'src/TimeSlots/Domain/TimeSlotId';
import { TimeSlotIsBooked } from 'src/TimeSlots/Domain/TimeSlotIsBooked';
import { TimeSlotModel } from 'src/TimeSlots/TimeSlot.model';
import { TimeSlotStart } from 'src/TimeSlots/Domain/TimeSlotStart';

// import parse from 'date-fns/parse';
// import format from 'date-fns/format';

export const TimeSlotMapper = {
  toPersistence: (timeSlot: TimeSlot): TimeSlotModel => {
    const timeSlotModel = new TimeSlotModel();
    timeSlotModel.id = timeSlot.id;
    // start: format(timeSlot.start, 'HH:mm'),
    // end: format(timeSlot.end, 'HH:mm'),
    timeSlotModel.start = timeSlot.start;
    timeSlotModel.end = timeSlot.end;
    timeSlotModel.isBooked = timeSlot.isBooked;
    return timeSlotModel;
  },

  toDomain: (timeSlotPersistence: TimeSlotModel): TimeSlot =>
    new TimeSlot({
      timeSlotId: new TimeSlotId(timeSlotPersistence.id),
      startTime: new TimeSlotStart(timeSlotPersistence.start),
      endTime: new TimeSlotEnd(timeSlotPersistence.end),
      isBooked: new TimeSlotIsBooked(timeSlotPersistence.isBooked),
      isBookedByCustomer: new IsBookedByCustomer(false),
    }),
};
