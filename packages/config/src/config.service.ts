import { Injectable } from "@nestjs/common";
import { DEFAULT_CONFIG } from "./config.default";
import { ConfigData, ConfigDatabase, ConfigSwagger } from "./config.interface";
import { Transport } from "@nestjs/microservices";
@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: parseInt(env.PORT!, 10),
      db: this.parseDBConfig(env, DEFAULT_CONFIG.db),
      swagger: this.parseSwaggerConfig(env, DEFAULT_CONFIG.swagger),
      logLevel: env.LOG_LEVEL!,
      auth: {
        expiresIn: Number(env.TOKEN_EXPIRY),
        access_token_secret: env.JWT_ACCESS_TOKEN_SECRET!,
        refresh_token_secret: env.JWT_REFRESH_TOKEN_SECRET!,
      },
      userService: {
        options: {
          host: env.USER_SERVICE_HOST!,
          port: Number(env.USER_SERVICE_PORT!),
        },
        transport: Transport.TCP,
      },
      tokenService: {
        options: {
          host: env.TOKEN_SERVICE_HOST!,
          port: Number(env.TOKEN_SERVICE_PORT!),
        },
        transport: Transport.TCP,
      },
      authService: {
        options: {
          host: env.AUTH_SERVICE_HOST!,
          port: Number(env.AUTH_SERVICE_PORT!),
        },
        transport: Transport.GRPC,
      },
      redisService: {
        options: {
          host: env.REDIS_SERVICE_HOST!,
          port: Number(env.REDIS_SERVICE_PORT!),
        },
        transport: Transport.REDIS,
      },
      rmqService: {
        options: {
          host: env.RMQ_SERVICE_HOST!,
          port: Number(env.RMQ_SERVICE_PORT!),
        },
        transport: Transport.RMQ,
      },
    };
  }
  private parseDBConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigDatabase>
  ) {
    return {
      url: env.DATABASE_URL || defaultConfig.url,
    };
  }
  private parseSwaggerConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigSwagger>
  ) {
    return {
      username: env.SWAGGER_USERNAME || defaultConfig.username,
      password: env.SWAGGER_PASSWORD || defaultConfig.password,
    };
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
