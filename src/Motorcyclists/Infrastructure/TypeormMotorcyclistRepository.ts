import { Injectable } from '@nestjs/common';

import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistMapper } from './mappers/MotorcyclistMapper';
import { MotorcyclistModel } from '@Motorcyclists/Infrastructure/Motorcyclist.model';
import { MotorcyclistRepository } from '@Motorcyclists/Domain/MotorcyclistRepository';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';

@Injectable()
export class TypeormMotorcyclistRepository implements MotorcyclistRepository {
  constructor(private readonly _uow: Uow) {}

  async save(motorcyclist: Motorcyclist): Promise<void> {
    await this._uow.manager.save(
      MotorcyclistMapper.toPersistence(motorcyclist),
    );
  }

  async findAll(): Promise<Motorcyclist[]> {
    const motorcyclistModelCollection = await this._uow.manager.find(
      MotorcyclistModel,
    );

    return motorcyclistModelCollection.map(MotorcyclistMapper.toDomain);
  }
}
