import { Module } from '@nestjs/common';

import { ApiExceptionListener } from './ApiExceptionListener';
import { ApiExceptionsMapping } from './ApiExceptionMapping';

@Module({
  providers: [ApiExceptionListener, ApiExceptionsMapping],
  exports: [ApiExceptionListener, ApiExceptionsMapping],
})
export class ExceptionHandlerModule {}
