import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UserAppService } from './user.app.service';
import { ReqRegisterDto, ResRegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { ResGetUserDto } from './dto/getUser.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post('register')
  @ApiOkResponse({ type: ResRegisterDto })
  async createUser(@Body() user: ReqRegisterDto): Promise<ResRegisterDto> {
    return this.userAppService.registerUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: ResGetUserDto })
  async getUser(@Req() req: Request): Promise<ResGetUserDto> {
    return req.user;
  }
}
