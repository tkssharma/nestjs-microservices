import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './token.controller';
import { TokenService } from './services/token.service';
import { ConfigModule, ConfigService } from '@tkssharma/config';
import { DBModule } from '@tkssharma/database';
import { TokenEntity } from './token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DBModule.forRoot({
      entities: [TokenEntity],
    }),
    TypeOrmModule.forFeature([TokenEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get().auth.access_token_secret,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
