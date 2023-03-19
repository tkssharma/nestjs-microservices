import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracingModule } from '@tkssharma/tracing';

@Module({
  imports: [TracingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
