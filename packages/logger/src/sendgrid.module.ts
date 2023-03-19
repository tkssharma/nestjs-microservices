// Package.
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SendGridModule } from "@ntegral/nestjs-sendgrid";

// Internal.
import { SendgridService } from "./sendgrid.service";

// Code.

@Global()
@Module({
  imports: [
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.get("SENDGRID_ACCESS_KEY") || "",
      }),
    }),
  ],
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridModule {}
