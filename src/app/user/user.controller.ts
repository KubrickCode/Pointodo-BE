import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UserAppService } from './user.app.service';
import { ReqRegisterDto, ResRegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { ResGetUserDto } from './dto/getUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post('register')
  async createUser(@Body() user: ReqRegisterDto): Promise<ResRegisterDto> {
    return this.userAppService.registerUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req: Request): Promise<ResGetUserDto> {
    return req.user;
  }
}
