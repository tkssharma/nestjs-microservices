// Package.
import { Global, Module } from "@nestjs/common";
import { TracingService } from "./tracing.service";
// Code.

@Global()
@Module({
  imports: [],
  providers: [TracingService],
  exports: [TracingService],
})
export class TracingModule {}
