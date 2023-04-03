import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenService } from './services/token.service';

@Controller('user')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern({ cmd: 'getUser' })
  async getUser() {
    console.log(this.tokenService);
    const token = await this.tokenService.createToken('hello');
    return token;
  }
}
