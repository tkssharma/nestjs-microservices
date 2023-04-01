import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';

import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_search_by_credentials')
  public async searchUserByCredentials(searchParams: {
    email: string;
    password: string;
  }): Promise<any> {
    let result: any;

    if (searchParams.email && searchParams.password) {
      const user = await this.userService.searchUserByEmail({
        email: searchParams.email,
      });

      if (user) {
        if (
          this.userService.comparePassword(searchParams.password, user.password)
        ) {
          result = {
            status: HttpStatus.OK,
            message: 'user_search_by_credentials_success',
            user: user,
          };
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'user_search_by_credentials_not_match',
            user: null,
          };
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_search_by_credentials_not_found',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'user_search_by_credentials_not_found',
        user: null,
      };
    }

    return result;
  }

  @MessagePattern('user_get_by_id')
  public async getUserById(id: string): Promise<any> {
    let result: any;

    if (id) {
      const user = await this.userService.searchUserById(id);
      if (user) {
        result = {
          status: HttpStatus.OK,
          message: 'user_get_by_id_success',
          user,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_get_by_id_not_found',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_get_by_id_bad_request',
        user: null,
      };
    }

    return result;
  }

  @MessagePattern('user_create')
  public async createUser(userParams: any): Promise<any> {
    let result: any;

    if (userParams) {
      const usersWithEmail = await this.userService.searchUserByEmail({
        email: userParams.email,
      });

      if (usersWithEmail) {
        result = {
          status: HttpStatus.CONFLICT,
          message: 'user_create_conflict',
          user: null,
          errors: {
            email: {
              message: 'Email already exists',
              path: 'email',
            },
          },
        };
      } else {
        try {
          userParams.is_confirmed = false;
          const createdUser = await this.userService.createUser(userParams);

          delete createdUser.password;
          result = {
            status: HttpStatus.CREATED,
            message: 'user_create_success',
            user: createdUser,
            errors: null,
          };
          return result;
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'user_create_precondition_failed',
            user: null,
            errors: e.errors,
          };
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_create_bad_request',
        user: null,
        errors: null,
      };
    }

    return result;
  }
}
