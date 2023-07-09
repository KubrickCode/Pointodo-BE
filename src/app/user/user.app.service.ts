import { Injectable } from '@nestjs/common';
import { UserService } from '@domain/user/user.service';
import { ReqRegisterDto, ResRegisterDto } from './dto/register.dto';
import { DomainRegisterDto } from '@domain/user/dto/register.dto';
import { plainToClass } from 'class-transformer';
import { REGISTER_SUCCESS_MESSAGE } from './messages/user.messages';

@Injectable()
export class UserAppService {
  constructor(private readonly userService: UserService) {}

  async registerUser(user: ReqRegisterDto): Promise<ResRegisterDto> {
    const newUser = plainToClass(DomainRegisterDto, user);
    await this.userService.createUser(newUser);

    return { message: REGISTER_SUCCESS_MESSAGE };
  }
}
