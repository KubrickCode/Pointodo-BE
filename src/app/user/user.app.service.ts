import { Injectable } from '@nestjs/common';
import { UserService } from '@domain/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/register.dto';

@Injectable()
export class UserAppService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<string> {
    const { email, password } = createUserDto;
    const user = await this.userService.createUser(email, password);

    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
