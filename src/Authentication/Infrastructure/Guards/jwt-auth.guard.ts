import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AccessPayload } from '@Authentication/Domain/AccessPayload';
import { JSendError, StatusType } from '@SharedKernel/Infrastructure/Response';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser extends AccessPayload>(err: unknown, user: TUser): TUser {
    if (err || !user) {
      const responseError: JSendError = {
        status: StatusType.ERROR,
        message: 'Unauthorized',
      };
      throw err || new UnauthorizedException(responseError);
    }

    return user;
  }
}
