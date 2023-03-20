// Package.
import { Global, Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
// Code.

@Global()
@Module({
  imports: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
