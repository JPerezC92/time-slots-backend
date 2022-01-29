import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './Authentication/authentication.module';

import { DatabaseModule } from './SharedKernel/Infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    DatabaseModule,
    AuthenticationModule,
    RouterModule.register([{ path: 'auth', module: AuthenticationModule }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
