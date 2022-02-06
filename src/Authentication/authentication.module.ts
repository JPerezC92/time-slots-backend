import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Infrastructure/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationPostLoginController } from '@Authentication/Infrastructure/Controllers/AuthenticationPostLogin.controller';
import { AuthenticationPostRegisterController } from '@Authentication/Infrastructure/Controllers/AuthenticationPostRegister.controller';
import { DatabaseModule } from '@SharedKernel/Infrastructure/database/database.module';
import { JsUuidGenerator } from '@SharedKernel/Infrastructure/JsUuidGenerator';
import { JwtAuthGuard } from '@Authentication/Infrastructure/Guards/jwt-auth.guard';
import { jwtModuleConfig } from '@Authentication/Infrastructure/JwtModuleConfig';
import { TestController } from '@Authentication/Infrastructure/Controllers/TestController';
import { TypeormAuthRepository } from '@Authentication/Infrastructure/TypeormAuthRepository';
import { TypeormCustomerRepository } from '@Customers/Infrastructure/TypeormCustomerRepositpry';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync(jwtModuleConfig),
  ],
  controllers: [
    AuthenticationPostLoginController,
    AuthenticationPostRegisterController,
    TestController,
  ],
  providers: [
    JsUuidGenerator,
    JwtAuthGuard,
    JwtStrategy,
    TypeormAuthRepository,
    TypeormCustomerRepository,
  ],
  exports: [JwtAuthGuard, JwtStrategy],
})
export class AuthenticationModule {}
