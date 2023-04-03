import { Controller, Get, Req, Inject } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Authorization } from './decorators/authorization.decorator';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';

import { GetUserByTokenResponseDto } from './interfaces/user/dto/get-user-by-token-response.dto';
import { GrpcService } from './services/user.service';

@Controller('grpc')
@ApiTags('grpc')
export class GrpcController {
  constructor(
    @Inject('GRPC_SERVICE') private readonly authUserService: GrpcService,
  ) {}

  @Get()
  @Authorization(false)
  @ApiOkResponse({
    type: GetUserByTokenResponseDto,
  })
  @ApiTags('grpc')
  @Get('/grpc')
  @ApiOkResponse({
    type: GetUserByTokenResponseDto,
  })
  public async createToken(@Req() request: IAuthorizedRequest): Promise<any> {
    const token = await this.authUserService.createToken({ userId: uuidv4() });

    return {
      message: 'successful',
      token: token,
    };
  }
}
