require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { UserModule } from './user.module';
import { ConfigService } from '@tkssharma/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(new ConfigService().get().port),
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
