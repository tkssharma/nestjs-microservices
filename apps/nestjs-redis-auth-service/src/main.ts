require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import {
  Transport,
  TcpOptions,
  GrpcOptions,
  RedisOptions,
} from '@nestjs/microservices';

import { TokenModule } from './token.module';
import { ConfigService } from '@tkssharma/config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: Transport.REDIS,
    options: {
      url: `redis://localhost:6379`,
    } as RedisOptions,
  });
  await app.listen();
}
bootstrap();
