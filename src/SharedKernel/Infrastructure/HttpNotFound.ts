import { HttpException, HttpStatus } from '@nestjs/common';
import { JSendFailure, StatusType } from './Response';

export class HttpNotFound extends HttpException {
  private static readonly defaultResponse: JSendFailure = {
    status: StatusType.FAIL,
    message: 'Not Found',
  };

  constructor(message?: string) {
    super(
      !message
        ? HttpNotFound.defaultResponse
        : { ...HttpNotFound.defaultResponse, message },
      HttpStatus.NOT_FOUND,
    );
  }
}
