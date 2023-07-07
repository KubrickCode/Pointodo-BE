import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { UserAppService } from './user.app.service';
import { CreateUserDto } from './dto/register.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    return this.userAppService.registerUser(createUserDto);
  }

  @Get()
  async getUser(@Req() req: Request) {
    const cookies = req.cookies;
    console.log(cookies);
  }
}
