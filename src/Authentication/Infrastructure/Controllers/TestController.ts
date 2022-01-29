import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AccessPayload } from 'src/Authentication/Domain/AccessPayload';
import { Uow } from 'src/SharedKernel/Infrastructure/database/Uow.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller()
export class TestController {
  constructor(private readonly _uow: Uow) {}

  @UseGuards(JwtAuthGuard)
  @Post('test')
  getProfile(@Request() req: { user: AccessPayload }) {
    return { test: 'test', user: req.user.id };
  }
}
