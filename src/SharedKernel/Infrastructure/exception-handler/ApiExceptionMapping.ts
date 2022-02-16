import { HttpException, Injectable } from '@nestjs/common';
import { DomainException } from '@SharedKernel/Domain/DomainException';

import { HttpInternalServerError } from '@SharedKernel/Infrastructure/HttpInternalServerError';

export interface ExceptionsMap {
  [key: string]: new (
    content?: string | Record<string, string>,
  ) => HttpException;
}

@Injectable()
export class ApiExceptionsMapping {
  private _exceptions: ExceptionsMap = {
    [HttpInternalServerError.name]: HttpInternalServerError,
  };

  public register(exceptions: ExceptionsMap): void {
    this._exceptions = { ...this._exceptions, ...exceptions };
  }

  public responseFor(
    error: HttpInternalServerError | DomainException,
  ): HttpException {
    const httpException = this._exceptions[error.name];

    if (!httpException) {
      throw new Error(`No HttpStatusCodeType found for error: ${error.name}`);
    }

    return new httpException(error.message);
  }
}
