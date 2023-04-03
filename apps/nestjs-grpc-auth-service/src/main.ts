require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions, GrpcOptions } from '@nestjs/microservices';

import { AuthModule } from './auth.module';
import { ConfigService } from '@tkssharma/config';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.GRPC,
    options: {
      host: '0.0.0.0',
      port: Number(new ConfigService().get().port),
      package: 'auth',
      protoPath: path.join(__dirname, 'auth/auth.proto'),
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
