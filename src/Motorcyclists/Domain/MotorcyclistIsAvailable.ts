import { BooleanValueObject } from 'src/SharedKernel/Domain/BooleanValueObject';

export class MotorcyclistIsAvailable extends BooleanValueObject {
  public Take(): MotorcyclistIsAvailable {
    return new MotorcyclistIsAvailable(false);
  }

  public TakeBack(): MotorcyclistIsAvailable {
    return new MotorcyclistIsAvailable(true);
  }
}
