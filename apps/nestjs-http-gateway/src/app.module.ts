import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { UsersController } from './users.controller';

import { AuthGuard } from './services/guards/authorization.guard';
import { ConfigModule, ConfigService } from '@tkssharma/config';
import { join } from 'path';
import { GrpcService } from './services/user.service';
import { GrpcController } from './grpc.controller';
import { RedisController } from './redis.controller';
@Module({
  imports: [ConfigModule],
  controllers: [UsersController, GrpcController, RedisController],
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
      provide: 'REDIS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get().redisService;
        return ClientProxyFactory.create({
          transport: tokenServiceOptions.transport,
          options: {
            url: `redis://localhost:6379`,
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'RMQ_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get().rmqService;
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
      provide: 'GRPC_AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get().authService;
        return ClientProxyFactory.create({
          options: {
            host: `${authServiceOptions.options.host}`,
            port: `${authServiceOptions.options.port}`,
            package: 'auth',
            protoPath: join(__dirname, './auth/auth.proto'),
            loaders: {
              enums: String,
              objects: true,
              arrays: true,
            },
          },
          transport: authServiceOptions.transport,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'GRPC_SERVICE',
      useClass: GrpcService,
    },
  ],
})
export class AppModule {}
