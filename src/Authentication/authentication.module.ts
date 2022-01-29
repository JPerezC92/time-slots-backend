import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { JwtStrategy } from './Infrastructure/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationPostLoginController } from './Infrastructure/Controllers/AuthenticationPostLogin.controller';
import { AuthenticationPostRegisterController } from './Infrastructure/Controllers/AuthenticationPostRegister.controller';
import { DatabaseModule } from 'src/SharedKernel/Infrastructure/database/database.module';
import {
  EnvironmentVariables,
  TEnvironmentVariables,
} from 'src/SharedKernel/Infrastructure/EnvVar';
import { JsUuidGenerator } from 'src/SharedKernel/Infrastructure/JsUuidGenerator';
import { JwtAuthGuard } from './Infrastructure/jwt-auth.guard';
import { TestController } from './Infrastructure/Controllers/TestController';
import { TypeormAuthRepository } from './Infrastructure/TypeormAuthRepository';
import { TypeormCustomerRepository } from 'src/Customers/Infrastructure/TypeormCustomerRepositpry';

const JwtModuleConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  async useFactory(configService: ConfigService<TEnvironmentVariables>) {
    return {
      secret: configService.get(EnvironmentVariables.JWT_SECRET),
      signOptions: {
        expiresIn: '1h',
      },
    };
  },
};

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync(JwtModuleConfig),
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
  exports: [JwtAuthGuard],
})
export class AuthenticationModule {}
