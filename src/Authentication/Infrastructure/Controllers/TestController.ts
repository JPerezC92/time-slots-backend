import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import { JwtAuthGuard } from '@Authentication/Infrastructure/Guards/jwt-auth.guard';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';

@Controller()
export class TestController {
  constructor(private readonly _uow: Uow) {}

  @UseGuards(JwtAuthGuard)
  @Post('test')
  getProfile(@Request() req: { user: AccessPayload }) {
    return { test: 'test', user: req.user.id };
  }
}
