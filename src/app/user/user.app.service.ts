import { Injectable } from '@nestjs/common';
import { UserService } from '@domain/user.service';
import { ReqRegisterDto, ResRegisterDto } from './dto/register.dto';
import { DomainRegisterDto } from '@domain/user/dto/register.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserAppService {
  constructor(private readonly userService: UserService) {}

  async registerUser(user: ReqRegisterDto): Promise<ResRegisterDto> {
    const newUser = plainToClass(DomainRegisterDto, user);
    await this.userService.createUser(newUser);

    return { message: '회원가입 성공' };
  }
}
