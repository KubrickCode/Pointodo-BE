import { Injectable } from '@nestjs/common';
import { UserService } from '@domain/user.service';
import { CreateUserDto } from './dto/register.dto';

@Injectable()
export class UserAppService {
  constructor(private readonly userService: UserService) {}

  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    const { email, password } = createUserDto;
    await this.userService.createUser(email, password);

    return { message: '회원가입 성공' };
  }
}
