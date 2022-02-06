import { IsBookedByCustomer } from 'src/TimeSlots/Domain/IsBookedByCustomer';
import { TimeSlot } from 'src/TimeSlots/Domain/TimeSlot';
import { TimeSlotEnd } from 'src/TimeSlots/Domain/TimeSlotEnd';
import { TimeSlotId } from 'src/TimeSlots/Domain/TimeSlotId';
import { TimeSlotIsBooked } from 'src/TimeSlots/Domain/TimeSlotIsBooked';
import { TimeSlotModel } from '@TimeSlots/Infrastructure/TimeSlot.model';
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
    return timeSlotModel;
  },

  toDomain: ({
    id,
    end,
    isBooked,
    isBookedByCustomer,
    start,
  }: TimeSlotModel): TimeSlot =>
    new TimeSlot({
      timeSlotId: new TimeSlotId(id),
      startTime: new TimeSlotStart(start),
      endTime: new TimeSlotEnd(end),
      isBooked: new TimeSlotIsBooked(Boolean(isBooked)),
      isBookedByCustomer: new IsBookedByCustomer(Boolean(isBookedByCustomer)),
    }),

  toResponse: (timeSlot: TimeSlot) => ({
    id: timeSlot.id,
    start: timeSlot.start,
    end: timeSlot.end,
    isBooked: timeSlot.isBooked,
    isBookedByCustomer: timeSlot.isBookedByCustomer,
  }),
};
