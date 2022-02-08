import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  JSendSuccess,
  StatusType,
} from '@SharedKernel/Infrastructure/Response';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';

@Controller()
export class AuthenticationGetController {
  @UseGuards(JwtAuthGuard)
  @Get('info')
  async run(@Req() req: { user: AccessPayload }): Promise<JSendSuccess> {
    return {
      status: StatusType.SUCCESS,
      data: { user: req.user },
    };
  }
}
