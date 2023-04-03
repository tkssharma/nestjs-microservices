import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';
import { ITokenResponse } from './interfaces/token-response.interface';
import { ITokenDataResponse } from './interfaces/token-data-response.interface';
import { ITokenDestroyResponse } from './interfaces/token-destroy-response.interface';

@Controller('token')
export class AuthController {
  constructor(private readonly tokenService: AuthService) {}

  @GrpcMethod('AuthService', 'createToken')
  public async createToken(data: { userId: string }): Promise<ITokenResponse> {
    let result: ITokenResponse;
    if (data && data.userId) {
      try {
        const token = await this.tokenService.createToken(data.userId);
        result = {
          status: HttpStatus.CREATED,
          message: 'token_create_success',
          data: token,
        };
      } catch (e) {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'token_create_bad_request',
          data: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'token_create_bad_request',
        data: null,
      };
    }

    return result;
  }

  public async destroyToken(data: {
    userId: string;
  }): Promise<ITokenDestroyResponse> {
    return {
      status: data && data.userId ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message:
        data && data.userId
          ? (await this.tokenService.deleteTokenForUserId(data.userId)) &&
            'token_destroy_success'
          : 'token_destroy_bad_request',
      errors: null,
    };
  }

  @GrpcMethod('AuthService', 'decodeToken')
  public async decodeToken(data: {
    token: string;
  }): Promise<ITokenDataResponse> {
    const tokenData = await this.tokenService.decodeToken(data.token);
    return {
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: tokenData ? 'token_decode_success' : 'token_decode_unauthorized',
      data: tokenData,
    };
  }
}
