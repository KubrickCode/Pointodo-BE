import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UserAppService } from './user.app.service';
import { CreateUserDto } from './dto/register.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    return this.userAppService.registerUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req: Request) {
    return req.user;
  }
}
