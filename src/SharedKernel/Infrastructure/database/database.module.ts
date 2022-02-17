import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Constant } from '@SharedKernel/Infrastructure/Constant';
import {
  EnvironmentVariables,
  TEnvironmentVariables,
} from '@SharedKernel/Infrastructure/EnvVar';
import { JsUuidGenerator } from '@SharedKernel/Infrastructure/JsUuidGenerator';
import { NodeEnv } from '@SharedKernel/Infrastructure/NodeEnv.type';
import { Uow } from '@SharedKernel/Infrastructure/database/Uow.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService<TEnvironmentVariables>) {
        const NODE_ENV = configService.get<NodeEnv>(
          EnvironmentVariables.NODE_ENV,
        );

        return {
          // type: configService.get(EnvVar.DB_CONNECTION) as 'sqlite',
          type: 'sqlite',
          // host: configService.get(EnvVar.DB_HOST),
          // port: configService.get(EnvVar.DB_PORT),
          // username: configService.get(EnvVar.DB_USERNAME),
          // password: configService.get(EnvVar.DB_PASSWORD),
          database: configService.get(EnvironmentVariables.DB_DATABASE),
          // database: configService.get(EnvVar.DB_NAME),
          entities: [__dirname + '*/../../../**/*.model{.ts,.js}'],
          synchronize: NODE_ENV !== Constant.PRODUCTION,
          logging: NODE_ENV !== Constant.PRODUCTION,
          ssl: NODE_ENV === Constant.PRODUCTION,
          extra: NODE_ENV === Constant.PRODUCTION && {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
  ],
  exports: [Uow, JsUuidGenerator],
  providers: [Uow, JsUuidGenerator],
})
export class DatabaseModule {}
