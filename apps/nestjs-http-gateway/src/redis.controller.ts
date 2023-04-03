import { Controller, Get, Req, Inject } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Authorization } from './decorators/authorization.decorator';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';

import { GetUserByTokenResponseDto } from './interfaces/user/dto/get-user-by-token-response.dto';
import { GrpcService } from './services/user.service';
import { ClientRedis } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('redis')
@ApiTags('redis')
export class RedisController {
  constructor(
    @Inject('REDIS_SERVICE') private readonly authUserService: ClientRedis,
  ) {}

  @Get()
  @Authorization(false)
  @ApiOkResponse({
    type: GetUserByTokenResponseDto,
  })
  @ApiTags('redis')
  @Get('/redis')
  @ApiOkResponse({
    type: GetUserByTokenResponseDto,
  })
  public async getUser(@Req() request: IAuthorizedRequest): Promise<any> {
    console.log(this.authUserService);

    const pattern = { cmd: 'getUser' };

    const userResponse: any = await firstValueFrom(
      this.authUserService.send(pattern, {}),
    );
    return {
      message: 'successful',
      data: userResponse,
    };
  }
}
