import { Controller, Post } from '@nestjs/common';
import { parse } from 'date-fns';

import { JsUuidGenerator } from 'src/SharedKernel/Infrastructure/JsUuidGenerator';
import { IsBookedByCustomer } from 'src/TimeSlots/Domain/IsBookedByCustomer';
import { TimeSlot } from 'src/TimeSlots/Domain/TimeSlot';
import { TimeSlotEnd } from 'src/TimeSlots/Domain/TimeSlotEnd';
import { TimeSlotId } from 'src/TimeSlots/Domain/TimeSlotId';
import { TimeSlotIsBooked } from 'src/TimeSlots/Domain/TimeSlotIsBooked';
import { TimeSlotStart } from 'src/TimeSlots/Domain/TimeSlotStart';
import { TypeormTimeSlotRepository } from 'src/TimeSlots/TypeormTimeSlotRepository';

const timeSlotColl = [
  { isBooked: false, start: '8:00', end: '8:30' },
  { isBooked: false, start: '8:30', end: '9:00' },
  { isBooked: false, start: '9:00', end: '9:30' },
  { isBooked: false, start: '9:30', end: '10:00' },
  { isBooked: false, start: '10:00', end: '10:30' },
  { isBooked: false, start: '10:30', end: '11:00' },
  { isBooked: false, start: '11:00', end: '11:30' },
  { isBooked: false, start: '11:30', end: '12:00' },
  { isBooked: false, start: '12:00', end: '12:30' },
  { isBooked: false, start: '12:30', end: '13:00' },
  { isBooked: false, start: '13:00', end: '13:30' },
  { isBooked: false, start: '13:30', end: '14:00' },
  { isBooked: false, start: '14:00', end: '14:30' },
  { isBooked: false, start: '14:30', end: '15:00' },
  { isBooked: false, start: '15:00', end: '15:30' },
  { isBooked: false, start: '15:30', end: '16:00' },
  { isBooked: false, start: '16:00', end: '16:30' },
  { isBooked: false, start: '16:30', end: '17:00' },
  { isBooked: false, start: '17:00', end: '17:30' },
  { isBooked: false, start: '17:30', end: '18:00' },
  { isBooked: false, start: '18:00', end: '18:30' },
  { isBooked: false, start: '18:30', end: '19:00' },
  { isBooked: false, start: '19:00', end: '19:30' },
  { isBooked: false, start: '19:30', end: '20:00' },
];

@Controller()
export class TimeSlotsPostController {
  private readonly _jsUuidGenerator: JsUuidGenerator;
  constructor(
    private readonly _typeormTimeSlotRepository: TypeormTimeSlotRepository,
  ) {
    this._jsUuidGenerator = new JsUuidGenerator();
  }

  @Post()
  async run(): Promise<string> {
    await Promise.all(
      timeSlotColl.map((timeSlot) => {
        this._typeormTimeSlotRepository.save(
          new TimeSlot({
            endTime: new TimeSlotEnd(parse(timeSlot.end, 'HH:mm', new Date())),
            isBooked: new TimeSlotIsBooked(false),
            isBookedByCustomer: new IsBookedByCustomer(false),
            startTime: new TimeSlotStart(
              parse(timeSlot.start, 'HH:mm', new Date()),
            ),
            timeSlotId: new TimeSlotId(this._jsUuidGenerator.generate()),
          }),
        );
      }),
    );
    return 'Created';
  }
}
