import { HttpException, HttpStatus } from '@nestjs/common';
import { JSendFailure, StatusType } from './Response';

export class HttpForbidden extends HttpException {
  private static readonly defaultResponse: JSendFailure = {
    status: StatusType.FAIL,
    message: 'Forbidden',
  };

  constructor(message?: string) {
    super(
      !message
        ? HttpForbidden.defaultResponse
        : { ...HttpForbidden.defaultResponse, message: message },
      HttpStatus.FORBIDDEN,
    );
  }
}
