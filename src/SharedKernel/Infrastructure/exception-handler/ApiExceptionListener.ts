import { HttpException, Injectable } from '@nestjs/common';
import { DomainException } from '@SharedKernel/Domain/DomainException';

import { ApiExceptionsMapping } from '@SharedKernel/Infrastructure/exception-handler/ApiExceptionMapping';
import { HttpInternalServerError } from '@SharedKernel/Infrastructure/HttpInternalServerError';

@Injectable()
export class ApiExceptionListener {
  private readonly _defaultError = new HttpInternalServerError();

  constructor(private readonly _exceptionHandler: ApiExceptionsMapping) {}

  public onException(unknownError: unknown): HttpException {
    const error = DomainException.isDomainException(unknownError)
      ? unknownError
      : this._defaultError;

    const httpException = this._exceptionHandler.responseFor(error);

    return httpException;
  }
}
