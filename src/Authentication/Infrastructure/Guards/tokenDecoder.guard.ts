import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';

@Injectable()
export class TokenDecoder extends AuthGuard('jwt') {
  handleRequest<TUser extends AccessPayload>(err: unknown, user: TUser): TUser {
    return user;
  }
}
