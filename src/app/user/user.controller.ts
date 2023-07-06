import { Body, Controller, Post } from '@nestjs/common';
import { UserAppService } from './user.app.service';
import { CreateUserDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.userAppService.registerUser(createUserDto);
  }
}
