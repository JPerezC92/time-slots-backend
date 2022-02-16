import { HttpException, HttpStatus } from '@nestjs/common';
import { JSendFailure, StatusType } from './Response';

export class InvalidRequest extends HttpException {
  private static readonly defaultResponse: JSendFailure = {
    status: StatusType.FAIL,
    message: 'Invalid Request',
  };

  constructor(message?: string) {
    super(
      !message
        ? InvalidRequest.defaultResponse
        : { ...InvalidRequest.defaultResponse, message },
      HttpStatus.BAD_REQUEST,
    );
  }
}
