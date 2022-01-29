import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  JSendError,
  StatusType,
} from 'src/SharedKernel/Infrastructure/Response';
import { AccessPayload } from '../Domain/AccessPayload';

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
