import { Controller, Get } from '@nestjs/common';

import { FindMotorcyclists } from '@Motorcyclists/Application/FindMotorcyclists';
import {
  JSendSuccess,
  StatusType,
} from '@SharedKernel/Infrastructure/Response';
import { MotorcyclistMapper } from '@Motorcyclists/Infrastructure/mappers/MotorcyclistMapper';
import { TypeormMotorcyclistRepository } from '@Motorcyclists/Infrastructure/TypeormMotorcyclistRepository';

@Controller()
export class MotorcyclistGetController {
  private readonly _findMotorcyclists: FindMotorcyclists;

  constructor(
    private readonly _typeormMotorcyclistRepository: TypeormMotorcyclistRepository,
  ) {
    this._findMotorcyclists = new FindMotorcyclists({
      motorcyclistRepository: this._typeormMotorcyclistRepository,
    });
  }

  @Get()
  public async run(): Promise<JSendSuccess> {
    const motorcyclists = await this._findMotorcyclists.execute();

    return {
      status: StatusType.SUCCESS,
      data: {
        motorcyclists: motorcyclists.map(MotorcyclistMapper.toResponse),
      },
    };
  }
}
