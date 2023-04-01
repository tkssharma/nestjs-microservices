import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  public async searchUser(params: { email: string }): Promise<UserEntity[]> {
    return await this.userRepo.find({});
  }
  public async searchUserByEmail(params: {
    email: string;
  }): Promise<UserEntity> {
    const email = params.email;
    return await this.userRepo.findOne({ where: { email } });
  }

  public async searchUserById(id: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { id } });
  }

  public async updateUserById(
    id: string,
    userParams: { is_confirmed: boolean },
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } });
    return await this.userRepo.save({
      id: user.id,
      ...userParams,
    });
  }
  async comparePassword(enteredPassword, dbPassword) {
    return enteredPassword === dbPassword;
  }
  hashData(token: string) {
    return token;
  }

  public async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.userRepo.save({
      ...user,
      password: this.hashData(user.password),
    });
  }
}
