import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@tkssharma/config';
import { DBModule } from '@tkssharma/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    DBModule.forRoot({
      entities: [UserEntity],
    }),
    TypeOrmModule.forFeature([UserEntity]),
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
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
