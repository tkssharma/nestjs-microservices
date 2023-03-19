// Package.
import { Global, Module } from "@nestjs/common";
import { SendgridModule } from '@tkssharma/logger';
// Code.

@Global()
@Module({
  imports: [SendgridModule],
  providers: [],
  exports: [],
})
export class AppModule { }
