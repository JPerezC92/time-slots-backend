import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistRepository } from '@Motorcyclists/Domain/MotorcyclistRepository';
import { UseCase } from '@SharedKernel/Domain/UseCase';

export class FindMotorcyclists implements UseCase<Promise<Motorcyclist[]>> {
  private readonly motorcyclistRepository: MotorcyclistRepository;

  constructor(props: { motorcyclistRepository: MotorcyclistRepository }) {
    this.motorcyclistRepository = props.motorcyclistRepository;
  }

  async execute(): Promise<Motorcyclist[]> {
    const motorcyclistsCollection = await this.motorcyclistRepository.findAll();
    return motorcyclistsCollection;
  }
}
