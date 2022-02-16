import { HttpException, HttpStatus } from '@nestjs/common';
import { JSendError, StatusType } from './Response';

export class HttpInternalServerError extends HttpException {
  private static readonly defaultResponse: JSendError = {
    status: StatusType.ERROR,
    message: 'Internal Server Error',
  };

  constructor(message?: string) {
    super(
      !message
        ? HttpInternalServerError.defaultResponse
        : { ...HttpInternalServerError.defaultResponse, message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
