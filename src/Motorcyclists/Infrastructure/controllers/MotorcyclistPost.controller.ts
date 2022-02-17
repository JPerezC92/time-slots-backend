import { Controller, Post } from '@nestjs/common';

import { JsUuidGenerator } from '@SharedKernel/Infrastructure/JsUuidGenerator';
import { Motorcyclist } from '@Motorcyclists/Domain/Motorcyclists';
import { MotorcyclistId } from '@Motorcyclists/Domain/MotorcyclistId';
import { TypeormMotorcyclistRepository } from '@Motorcyclists/Infrastructure/TypeormMotorcyclistRepository';

@Controller()
export class MotorcyclistPostController {
  constructor(
    private readonly _jsUuidGenerator: JsUuidGenerator,
    private readonly _typeormMotorcyclistRepository: TypeormMotorcyclistRepository,
  ) {}
  @Post()
  public async run(): Promise<string> {
    await this._typeormMotorcyclistRepository.save(
      new Motorcyclist({
        motorcyclistId: new MotorcyclistId(this._jsUuidGenerator.generate()),
        bookingList: [],
      }),
    );
    return 'motorcyclist created';
  }
}
