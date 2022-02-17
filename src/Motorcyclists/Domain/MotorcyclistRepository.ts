import { Motorcyclist } from './Motorcyclists';

export interface MotorcyclistRepository {
  save(motorcyclist: Motorcyclist): Promise<void>;

  findAll(): Promise<Motorcyclist[]>;
}
