// Package.
import { Global, Module } from "@nestjs/common";
import { TracingModule } from "@tkssharma/tracing";
// Code.

@Global()
@Module({
  imports: [TracingModule],
  providers: [],
  exports: [],
})
export class AppModule {}
