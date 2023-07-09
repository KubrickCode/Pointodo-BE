import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UserAppService } from './user.app.service';
import { ReqRegisterDto, ResRegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { ResGetUserDto } from './dto/getUser.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { userDocs } from './docs/user.docs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post('register')
  @ApiOperation(userDocs.register)
  @ApiOkResponse({ type: ResRegisterDto })
  async createUser(@Body() user: ReqRegisterDto): Promise<ResRegisterDto> {
    return this.userAppService.registerUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation(userDocs.getUser)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResGetUserDto })
  async getUser(@Req() req: Request): Promise<ResGetUserDto> {
    return req.user;
  }
}
