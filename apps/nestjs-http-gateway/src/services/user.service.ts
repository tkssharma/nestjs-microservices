import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface AuthService {
  createToken(data: { userId: string }): Promise<any>;
  decodeToken(data: { token: string }): Promise<any>;
}

@Injectable()
export class GrpcService implements OnModuleInit {
  private authService: any;
  constructor(
    @Inject('GRPC_AUTH_SERVICE') private readonly userServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService =
      this.userServiceClient.getService<AuthService>('AuthService');
    console.log(this.authService, this.userServiceClient);
  }

  async createToken({ userId: string }): Promise<string> {
    const userResponse: any = await firstValueFrom(
      this.authService.createToken({ userId: string }),
    );
    return userResponse;
  }
}
