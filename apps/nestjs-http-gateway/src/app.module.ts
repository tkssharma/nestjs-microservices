import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { UsersController } from './users.controller';

import { AuthGuard } from './services/guards/authorization.guard';
import { ConfigModule, ConfigService } from '@tkssharma/config';
@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get().tokenService;
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get().userService;
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
