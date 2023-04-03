require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions, GrpcOptions } from '@nestjs/microservices';

import { TokenModule } from './token.module';
import { ConfigService } from '@tkssharma/config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: Transport.GRPC,
    options: {
      url: `${new ConfigService().get().authService.options.host}:${
        new ConfigService().get().authService.options.port
      }`,
      package: 'auth',
      protoPath: join(__dirname, './_proto/auth.proto'),
      loaders: {
        enums: String,
        objects: true,
        arrays: true,
      },
    },
  } as GrpcOptions);
  await app.listen();
}
bootstrap();
