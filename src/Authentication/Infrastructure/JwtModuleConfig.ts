import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import {
  EnvironmentVariables,
  TEnvironmentVariables,
} from '@SharedKernel/Infrastructure/EnvVar';

export const jwtModuleConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  async useFactory(configService: ConfigService<TEnvironmentVariables>) {
    return {
      secret: configService.get(EnvironmentVariables.JWT_SECRET),
      signOptions: {
        expiresIn: '4h',
      },
    };
  },
};
