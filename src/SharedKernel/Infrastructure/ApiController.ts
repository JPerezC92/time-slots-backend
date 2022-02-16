import { ApiExceptionListener } from '@SharedKernel/Infrastructure/exception-handler/ApiExceptionListener';
import {
  ApiExceptionsMapping,
  ExceptionsMap,
} from '@SharedKernel/Infrastructure/exception-handler/ApiExceptionMapping';

export abstract class ApiController {
  constructor(
    private readonly _exceptionHandler: ApiExceptionsMapping,
    protected readonly apiExceptionListener: ApiExceptionListener,
  ) {
    this._exceptionHandler.register(this.exceptions());
  }

  protected abstract exceptions(): ExceptionsMap;
}
